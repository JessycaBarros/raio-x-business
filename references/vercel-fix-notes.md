# Vercel Build Error Analysis

## Errors from Vercel Build Logs (screenshot)

1. `server/_core/cookies.ts(12,11): error TS2339: Property 'protocol' does not exist on type 'Request<core.ParamsDictio...'`
2. `server/_core/cookies.ts(14,30): error TS2339: Property 'headers' does not exist on type 'Request<core.ParamsDictio...'`
3. `server/_core/cookies.ts(21,25): error TS7006: Parameter 'proto' implicitly has an 'any' type.`
4. `server/_core/cookies.ts(26,24): error TS2344: Type '"domain"' is not assignable...`
5. `server/_core/cookies.ts(42,3): error TS2741: Property 'domain' is missing...`
6. `server/_core/sdk.ts(261,43): error TS2339: Property 'headers' does not exist on type 'Request<core.ParamsDictionary...'`
7. `server/_core/sdk.ts(268,30): error TS2339: Property 'headers' does not exist on type 'Request<core.ParamsDictionary...'`

## Root Cause

The `api/index.ts` file imports from `../server/_core/context` which imports from `./sdk` which imports `Request` from `express`. 
But the Vercel serverless function build likely uses a different tsconfig or doesn't include the `api/` folder in the same compilation context.

The issue is that `tsconfig.json` only includes `client/src/**/*`, `shared/**/*`, `server/**/*` - it does NOT include `api/**/*`.

When Vercel builds the `api/index.ts` serverless function, it may use its own TypeScript compilation that doesn't have `skipLibCheck: true` or has stricter settings.

## Solution

The simplest fix: add `"api/**/*"` to tsconfig include, OR create a separate `tsconfig.vercel.json` for the api folder, OR add `// @ts-nocheck` to the problematic files since they work fine at runtime.

Actually the real issue is likely that the Vercel build uses `pnpm build` which runs `tsc --noEmit` (the `check` script) - but the tsconfig doesn't include `api/`. The Vercel build step may be running its own tsc on the api folder.

Better solution: The errors are in `cookies.ts` and `sdk.ts` which are framework files. The issue is the `Request` type import. In the `api/index.ts` context, Express Request type might resolve differently. We should ensure the tsconfig includes the api folder and that types resolve correctly.
