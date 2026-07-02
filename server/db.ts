import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, leads } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Save a new lead from the quiz
export async function saveLead(lead: {
  name: string;
  email: string;
  phone: string;
  profile: string;
  answers: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save lead: database not available");
    return;
  }

  await db.insert(leads).values({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    profile: lead.profile as any,
    answers: lead.answers,
  });
}

// Notion template URLs for each profile
const NOTION_TEMPLATE_URLS: Record<string, string> = {
  visibilidade: "https://app.notion.com/p/391198ba152c81bd9df2f7a0aa1f69de",
  autoridade: "https://app.notion.com/p/391198ba152c813fb553c4f9e4f33eec",
  conteudo_sem_venda: "https://app.notion.com/p/391198ba152c81d9bdbee10813bec25f",
  funil: "https://app.notion.com/p/391198ba152c8173810ac46c0fc32d19",
  trafego_organico: "https://app.notion.com/p/391198ba152c81378be1c276d07e9e6a",
  anuncio_ineficiente: "https://app.notion.com/p/391198ba152c81ab91caec37b72638bb",
  estrutura: "https://app.notion.com/p/391198ba152c81b09bf7f9f82ebcfe1d",
};

export function getNotionTemplateUrl(profile: string): string {
  return NOTION_TEMPLATE_URLS[profile] || "";
}
