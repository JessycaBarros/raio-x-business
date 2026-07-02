import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import type { QuizAnswers } from "@shared/quiz";

interface LeadFormProps {
  answers: QuizAnswers;
}

export default function LeadForm({ answers }: LeadFormProps) {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitMutation = trpc.quiz.submit.useMutation({
    onSuccess: (data) => {
      // Navigate to result page with profile data
      navigate(`/resultado?profile=${data.profile}`);
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Informe seu nome";
    if (!email.trim()) newErrors.email = "Informe seu e-mail";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "E-mail inválido";
    if (!phone.trim()) newErrors.phone = "Informe seu telefone";
    else if (phone.replace(/\D/g, "").length < 10) newErrors.phone = "Telefone inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    submitMutation.mutate({
      answers: answers as Record<string, string>,
      lead: { name: name.trim(), email: email.trim(), phone: phone.trim() },
    });
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-full gold-bg flex items-center justify-center mx-auto mb-5">
          <Lock className="h-7 w-7 text-primary-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
          Seu diagnóstico está pronto!
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto">
          Preencha seus dados abaixo para receber seu{" "}
          <span className="text-[oklch(0.78_0.12_85)]">Plano de Crescimento de 15 Dias</span>{" "}
          personalizado.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-body text-sm text-foreground">
            Seu nome
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Como você se chama?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground font-body h-12 rounded-xl focus:border-[oklch(0.78_0.12_85)] focus:ring-[oklch(0.78_0.12_85/0.2)]"
          />
          {errors.name && <p className="text-xs text-destructive font-body">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-body text-sm text-foreground">
            Seu melhor e-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground font-body h-12 rounded-xl focus:border-[oklch(0.78_0.12_85)] focus:ring-[oklch(0.78_0.12_85/0.2)]"
          />
          {errors.email && <p className="text-xs text-destructive font-body">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="font-body text-sm text-foreground">
            Seu WhatsApp
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground font-body h-12 rounded-xl focus:border-[oklch(0.78_0.12_85)] focus:ring-[oklch(0.78_0.12_85/0.2)]"
          />
          {errors.phone && <p className="text-xs text-destructive font-body">{errors.phone}</p>}
        </div>

        <Button
          type="submit"
          disabled={submitMutation.isPending}
          className="w-full gold-bg text-primary-foreground py-6 text-base font-body font-semibold rounded-xl hover:opacity-90 transition-all duration-200 active:scale-[0.97] mt-4"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando seu diagnóstico...
            </>
          ) : (
            "Revelar Meu Diagnóstico"
          )}
        </Button>

        {submitMutation.isError && (
          <p className="text-xs text-destructive text-center font-body">
            Ocorreu um erro. Tente novamente.
          </p>
        )}

        <p className="text-xs text-muted-foreground text-center font-body">
          Seus dados estão seguros e não serão compartilhados com terceiros.
        </p>
      </form>
    </div>
  );
}
