import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { calculateProfile, PROFILES, PROFILE_INFO } from "@shared/quiz";
import { syncLeadToNotion, getNotionTemplateUrl } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  quiz: router({
    submit: publicProcedure
      .input(
        z.object({
          answers: z.record(z.string(), z.string()),
          lead: z.object({
            name: z.string().min(1),
            email: z.string().email(),
            phone: z.string().min(10),
          }),
        })
      )
      .mutation(async ({ input }) => {
        // Convert string keys to number keys for calculateProfile
        const numericAnswers: Record<number, string> = {};
        for (const [key, value] of Object.entries(input.answers)) {
          numericAnswers[parseInt(key)] = value;
        }

        // Calculate the profile
        const profile = calculateProfile(numericAnswers);

        // Save lead directly to Notion (primary storage)
        const notionSuccess = await syncLeadToNotion({
          name: input.lead.name,
          email: input.lead.email,
          phone: input.lead.phone,
          profile,
        });

        if (!notionSuccess) {
          console.error("[Quiz] Failed to save lead to Notion");
          // Still return the profile even if Notion sync fails
        }

        // Notify owner about new lead (only if forge API is configured)
        const profileTitle = PROFILE_INFO[profile]?.title || profile;
        try {
          const { ENV } = await import("./_core/env");
          if (ENV.forgeApiUrl && ENV.forgeApiKey) {
            const { notifyOwner } = await import("./_core/notification");
            notifyOwner({
              title: `Novo Lead RAIO-X: ${input.lead.name}`,
              content: `Nome: ${input.lead.name}\nE-mail: ${input.lead.email}\nWhatsApp: ${input.lead.phone}\nPerfil: ${profileTitle}`,
            }).catch(() => {});
          }
        } catch {
          // Notification is optional - skip if not configured
        }

        return { profile };
      }),

    getTemplateUrl: publicProcedure
      .input(z.object({ profile: z.enum(PROFILES) }))
      .query(({ input }) => {
        const url = getNotionTemplateUrl(input.profile);
        return { url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
