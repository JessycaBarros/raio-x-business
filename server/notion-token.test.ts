import { describe, expect, it } from "vitest";

describe("Notion API Token Validation", () => {
  it("should have NOTION_API_TOKEN configured", () => {
    const token = process.env.NOTION_API_TOKEN;
    expect(token).toBeTruthy();
    expect(token!.length).toBeGreaterThan(10);
  });

  it("should authenticate with Notion API", async () => {
    const token = process.env.NOTION_API_TOKEN;
    if (!token) {
      console.warn("Skipping: NOTION_API_TOKEN not set");
      return;
    }

    const response = await fetch("https://api.notion.com/v1/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("type");
  });
});
