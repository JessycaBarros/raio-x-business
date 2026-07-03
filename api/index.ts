// @ts-nocheck
// Vercel Serverless Function - handles tRPC API requests
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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Mount tRPC - handles both /api/trpc/* (from rewrite) and /trpc/* (fallback)
app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

// Catch-all for the function
app.all("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
