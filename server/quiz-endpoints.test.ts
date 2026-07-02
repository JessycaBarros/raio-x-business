import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification
vi.mock("./db", () => ({
  saveLead: vi.fn().mockResolvedValue(undefined),
  syncLeadToNotion: vi.fn().mockResolvedValue(true),
  markLeadSynced: vi.fn().mockResolvedValue(undefined),
  getNotionTemplateUrl: vi.fn((profile: string) => {
    const urls: Record<string, string> = {
      visibilidade: "https://app.notion.com/p/test-visibilidade",
      autoridade: "https://app.notion.com/p/test-autoridade",
      conteudo_sem_venda: "https://app.notion.com/p/test-conteudo",
      funil: "https://app.notion.com/p/test-funil",
      trafego_organico: "https://app.notion.com/p/test-trafego",
      anuncio_ineficiente: "https://app.notion.com/p/test-anuncio",
      estrutura: "https://app.notion.com/p/test-estrutura",
    };
    return urls[profile] || "";
  }),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn(),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("quiz.submit", () => {
  it("should classify and return a valid profile", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.submit({
      answers: {
        "1": "1a",
        "2": "2b",
        "3": "3a",
        "4": "4a",
        "5": "5a",
        "6": "6a",
      },
      lead: {
        name: "Maria Teste",
        email: "maria@teste.com",
        phone: "(11) 99999-9999",
      },
    });

    expect(result).toHaveProperty("profile");
    expect(typeof result.profile).toBe("string");
    expect(result.profile.length).toBeGreaterThan(0);
  });

  it("should reject invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quiz.submit({
        answers: { "1": "1a" },
        lead: {
          name: "Maria",
          email: "invalid-email",
          phone: "(11) 99999-9999",
        },
      })
    ).rejects.toThrow();
  });

  it("should reject empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quiz.submit({
        answers: { "1": "1a" },
        lead: {
          name: "",
          email: "maria@teste.com",
          phone: "(11) 99999-9999",
        },
      })
    ).rejects.toThrow();
  });
});

describe("quiz.getTemplateUrl", () => {
  it("should return a URL for a valid profile", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.getTemplateUrl({ profile: "visibilidade" });
    expect(result).toHaveProperty("url");
    expect(result.url).toContain("notion.com");
  });

  it("should return URL for all 7 profiles", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const profiles = [
      "visibilidade",
      "autoridade",
      "conteudo_sem_venda",
      "funil",
      "trafego_organico",
      "anuncio_ineficiente",
      "estrutura",
    ] as const;

    for (const profile of profiles) {
      const result = await caller.quiz.getTemplateUrl({ profile });
      expect(result.url).toBeTruthy();
    }
  });

  it("should reject invalid profile", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quiz.getTemplateUrl({ profile: "invalid_profile" as any })
    ).rejects.toThrow();
  });
});
