import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { QUIZ_QUESTIONS, type QuizAnswers } from "@shared/quiz";
import { useLocation } from "wouter";
import LeadForm from "@/components/LeadForm";

export default function Quiz() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState(1);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isOnQuestions = currentStep < totalQuestions;
  const isOnLeadForm = currentStep === totalQuestions;

  const currentQuestion = isOnQuestions ? QUIZ_QUESTIONS[currentStep] : null;
  const progress = ((currentStep) / (totalQuestions + 1)) * 100;

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    
    setTimeout(() => {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  const selectedOption = currentQuestion ? answers[currentQuestion.id] : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container max-w-3xl px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.62_0.1_45)] font-body font-medium">
              RAIO-X Business
            </span>
          </div>
          <span className="text-sm text-muted-foreground font-body">
            {currentStep + 1}/{totalQuestions + 1}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-border">
          <motion.div
            className="h-full rosegold-bg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-8 px-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            {isOnQuestions && currentQuestion && (
              <motion.div
                key={`question-${currentQuestion.id}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-foreground">
                    {currentQuestion.question}
                  </h2>
                  {currentQuestion.subtitle && (
                    <p className="text-muted-foreground font-body">
                      {currentQuestion.subtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, i) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 font-body ${
                        selectedOption === option.id
                          ? "border-[oklch(0.62_0.1_45)] bg-[oklch(0.62_0.1_45/0.06)] text-foreground shadow-sm"
                          : "border-border bg-card hover:border-[oklch(0.62_0.1_45/0.4)] hover:shadow-sm text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                            selectedOption === option.id
                              ? "border-[oklch(0.62_0.1_45)] bg-[oklch(0.62_0.1_45)]"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {selectedOption === option.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-sm md:text-base">{option.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {isOnLeadForm && (
              <motion.div
                key="lead-form"
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <LeadForm answers={answers} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
