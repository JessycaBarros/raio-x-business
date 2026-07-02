import { describe, expect, it } from "vitest";
import { calculateProfile, QUIZ_QUESTIONS, PROFILE_INFO, PROFILES } from "../shared/quiz";

describe("Quiz Classification Logic", () => {
  it("should return a valid profile for any set of answers", () => {
    // Answer all questions with first option
    const answers: Record<number, string> = {};
    for (const q of QUIZ_QUESTIONS) {
      answers[q.id] = q.options[0].id;
    }
    const profile = calculateProfile(answers);
    expect(PROFILES).toContain(profile);
  });

  it("should classify as visibilidade when answers lean toward visibility issues", () => {
    const answers: Record<number, string> = {
      1: "1a", // Ainda nao vendo de forma consistente -> visibilidade: 3
      2: "2b", // Tenho poucos seguidores qualificados -> visibilidade: 3
      3: "3a", // Nem sempre entende o que vendo -> autoridade: 3, visibilidade: 1
      4: "4a", // Nunca anunciei -> trafego_organico: 3, visibilidade: 1
      5: "5a", // Nao atrai pessoas novas -> visibilidade: 3
      6: "6b", // Crescer no Instagram com qualidade -> visibilidade: 2
    };
    const profile = calculateProfile(answers);
    expect(profile).toBe("visibilidade");
  });

  it("should classify as funil when answers lean toward funnel issues", () => {
    const answers: Record<number, string> = {
      1: "1b", // Ja vendo, mas faturamento oscila -> funil: 2
      2: "2e", // Muitas conversas, poucas vendas -> funil: 2
      3: "3c", // Interage, mas nao chama no WhatsApp -> funil: 3
      4: "4d", // Tenho gestor de trafego -> estrutura: 2, funil: 1
      5: "5d", // Gera seguidores, mas poucos viram clientes -> funil: 3
      6: "6c", // Vender mais com o que ja tenho -> funil: 2
    };
    const profile = calculateProfile(answers);
    expect(profile).toBe("funil");
  });

  it("should classify as estrutura when answers lean toward structure issues", () => {
    const answers: Record<number, string> = {
      1: "1d", // Quero escalar -> estrutura: 3
      2: "2e", // Muitas conversas, poucas vendas -> estrutura: 1
      3: "3e", // Compra uma vez e some -> estrutura: 3
      4: "4d", // Tenho gestor de trafego -> estrutura: 2
      5: "5e", // Gera clientes de forma consistente -> estrutura: 3
      6: "6d", // Organizar meu marketing e vendas -> estrutura: 3
    };
    const profile = calculateProfile(answers);
    expect(profile).toBe("estrutura");
  });

  it("should have profile info for all 7 profiles", () => {
    for (const profile of PROFILES) {
      expect(PROFILE_INFO[profile]).toBeDefined();
      expect(PROFILE_INFO[profile].title).toBeTruthy();
      expect(PROFILE_INFO[profile].subtitle).toBeTruthy();
      expect(PROFILE_INFO[profile].description).toBeTruthy();
    }
  });

  it("should have 6 quiz questions", () => {
    expect(QUIZ_QUESTIONS).toHaveLength(6);
  });

  it("each question should have at least 4 options", () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("each option should have scores that reference valid profiles", () => {
    for (const q of QUIZ_QUESTIONS) {
      for (const opt of q.options) {
        for (const key of Object.keys(opt.scores)) {
          expect(PROFILES).toContain(key);
        }
      }
    }
  });
});
