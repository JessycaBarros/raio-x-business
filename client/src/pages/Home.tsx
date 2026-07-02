import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Zap, TrendingUp, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[oklch(0.12_0.005_285)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[oklch(0.78_0.12_85/0.03)] blur-[120px]" />
        
        <div className="relative z-10 container max-w-4xl text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[oklch(0.78_0.12_85)] mb-6 font-body font-medium">
              Diagnóstico Estratégico Gratuito
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6">
              <span className="gold-gradient">RAIO-X</span>{" "}
              <span className="text-foreground">Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-body leading-relaxed">
              Descubra o que está impedindo seu negócio de crescer e receba um{" "}
              <span className="text-[oklch(0.78_0.12_85)] font-medium">
                Plano de Crescimento personalizado de 15 dias
              </span>{" "}
              para colocar em prática hoje.
            </p>
            <p className="text-sm text-muted-foreground mb-10 font-body">
              Por <span className="text-[oklch(0.78_0.12_85)]">Jessyca Barros</span> — Estrategista de Crescimento Digital
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <Button
              onClick={() => navigate("/quiz")}
              className="gold-bg text-primary-foreground px-8 py-6 text-lg font-body font-semibold rounded-full hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-[0_0_40px_oklch(0.78_0.12_85/0.2)]"
            >
              Fazer Meu Diagnóstico Gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4 font-body">
              Leva menos de 2 minutos • 100% gratuito
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[oklch(0.78_0.12_85/0.3)] rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-[oklch(0.78_0.12_85/0.5)] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Como funciona o <span className="gold-gradient">Diagnóstico</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Em menos de 2 minutos, você descobre exatamente o que está travando seu crescimento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Responda 6 perguntas",
                description: "Perguntas estratégicas que identificam o gargalo real do seu negócio",
              },
              {
                icon: Zap,
                title: "Receba seu diagnóstico",
                description: "A análise identifica seu principal problema entre 7 perfis mapeados",
              },
              {
                icon: TrendingUp,
                title: "Plano de 15 dias",
                description: "Um roteiro prático e personalizado com exatamente o que fazer, dia a dia",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-[oklch(0.78_0.12_85/0.3)] transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl gold-bg flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll receive */}
      <section className="py-24 px-6 bg-[oklch(0.12_0.005_285)]">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              O que você vai <span className="gold-gradient">receber</span>
            </h2>
          </motion.div>

          <div className="space-y-5">
            {[
              "Diagnóstico preciso do principal gargalo do seu negócio",
              "Plano de Crescimento personalizado de 15 dias",
              "Cronograma dia a dia com ações específicas para executar",
              "Checklist de implementação para acompanhar seu progresso",
              "Direcionamento estratégico baseado no seu momento atual",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border/30 bg-card/30"
              >
                <CheckCircle2 className="h-5 w-5 text-[oklch(0.78_0.12_85)] mt-0.5 shrink-0" />
                <p className="font-body text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => navigate("/quiz")}
              className="gold-bg text-primary-foreground px-8 py-6 text-lg font-body font-semibold rounded-full hover:opacity-90 transition-all duration-200 active:scale-[0.97]"
            >
              Quero Meu Diagnóstico Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/30">
        <div className="container max-w-4xl text-center">
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} Jessyca Barros — Estrategista de Crescimento Digital
          </p>
        </div>
      </footer>
    </div>
  );
}
