// server/_core/index.ts
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { appRouter } from "./routers.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do Vite (IMPORTANTE!)
const distPath = join(__dirname, "../../dist");
app.use(express.static(distPath, { maxAge: "1d" }));

// tRPC routes
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

// Fallback para SPA (qualquer rota desconhecida vai para index.html)
app.get("*", (req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

// Criar servidor HTTP
const server = createServer(app);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Servindo arquivos estáticos de: ${distPath}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM recebido, encerrando servidor...");
  server.close();
});
