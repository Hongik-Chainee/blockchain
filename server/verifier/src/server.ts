import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import challengeRoutes from "./api/challenge";

const HOST = process.env.HOST!;
const PORT = Number(process.env.PORT!);

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

app.register(challengeRoutes, { prefix: "/api" });

app.get("/healthz", async () => ({ ok: true, message: "Server is alive." }));

app.addHook("onSend", async (req, _reply, payload: unknown) => {
  try {
    const data = payload as { ok: boolean; message: string };
    if (data.ok === false) {
      req.log.error({ route: req.url, message: data.message, body: req.body });
    }
  } catch {}
});

app
  .listen({ port: PORT, host: HOST })
  .then(() =>
    app.log.info(`🚀 Verifier server running at http://${HOST}:${PORT}/api.`)
  )
  .catch((e) => {
    app.log.error(e);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  app.log.info("Closing verifier server...");
  await app.close();
  process.exit(0);
});
