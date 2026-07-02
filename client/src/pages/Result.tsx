import { motion } from "framer-motion";
import { ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROFILE_INFO, type ProfileType } from "@shared/quiz";
import { trpc } from "@/lib/trpc";

export default function Result() {
  const params = new URLSearchParams(window.location.search);
  const profile = params.get("profile") as ProfileType | null;

  const { data: templateData } = trpc.quiz.getTemplateUrl.useQuery(
    { profile: profile! },
    { enabled: !!profile }
  );

  if (!profile || !PROFILE_INFO[profile]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground font-body">Diagnóstico não encontrado.</p>
      </div>
    );
  }

  const info = PROFILE_INFO[profile];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="py-6 px-6 border-b border-border">
        <div className="container max-w-3xl flex items-center justify-center gap-4">
          <img
            src="/manus-storage/logo_01_acea916a.png"
            alt="Jessyca Barros"
            className="h-8 w-auto"
          />
          <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.62_0.1_45)] font-body font-medium">
            — Seu Diagnóstico
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            {/* Jessyca's photo - small avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <img
                src="/manus-storage/jessyca_new_adc024a5.webp"
                alt="Jessyca Barros"
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[oklch(0.62_0.1_45/0.3)] shadow-md"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.62_0.1_45/0.3)] bg-[oklch(0.62_0.1_45/0.05)] mb-8"
            >
              <Sparkles className="h-4 w-4 text-[oklch(0.62_0.1_45)]" />
              <span className="text-sm font-body text-[oklch(0.62_0.1_45)]">
                Diagnóstico Concluído
              </span>
            </motion.div>

            {/* Result title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
            >
              <span className="rosegold-gradient">{info.title}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-foreground font-body font-medium mb-4"
            >
              {info.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground font-body max-w-lg mx-auto mb-10 leading-relaxed"
            >
              {info.description}
            </motion.p>

            {/* CTA - Notion Template */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-2xl border border-[oklch(0.62_0.1_45/0.25)] bg-[oklch(0.62_0.1_45/0.03)] mb-6"
            >
              <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                Seu Plano de Crescimento de 15 Dias
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-6 max-w-md mx-auto">
                Preparamos um plano personalizado com ações práticas para você executar nos próximos 15 dias. Clique abaixo para acessar e duplicar o template.
              </p>
              
              {templateData?.url ? (
                <Button
                  asChild
                  className="rosegold-bg text-white px-8 py-6 text-base font-body font-semibold rounded-xl hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-[0_4px_16px_oklch(0.62_0.1_45/0.2)]"
                >
                  <a href={templateData.url} target="_blank" rel="noopener noreferrer">
                    Acessar Meu Plano no Notion
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <Button
                  disabled
                  className="rosegold-bg text-white px-8 py-6 text-base font-body font-semibold rounded-xl opacity-70"
                >
                  Carregando seu plano...
                </Button>
              )}
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-muted-foreground font-body space-y-2"
            >
              <p className="flex items-center justify-center gap-2">
                <ArrowRight className="h-3 w-3 text-[oklch(0.62_0.1_45)]" />
                Clique em "Duplicar" no Notion para salvar na sua conta
              </p>
              <p className="flex items-center justify-center gap-2">
                <ArrowRight className="h-3 w-3 text-[oklch(0.62_0.1_45)]" />
                Siga o cronograma dia a dia por 15 dias
              </p>
              <p className="flex items-center justify-center gap-2">
                <ArrowRight className="h-3 w-3 text-[oklch(0.62_0.1_45)]" />
                Marque cada tarefa conforme for executando
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container max-w-4xl text-center">
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} Jessyca Barros — Estrategista Digital
          </p>
        </div>
      </footer>
    </div>
  );
}
