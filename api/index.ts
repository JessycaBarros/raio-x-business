import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The Vercel rewrite sends /api/trpc/* to this function
// The request URL arrives as /api/trpc/quiz.submit etc.
// We mount tRPC at /api/trpc to match the client's URL
app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));

// Also handle if Vercel strips the prefix (fallback)
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

export default app;
