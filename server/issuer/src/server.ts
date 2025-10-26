import "dotenv/config";
import Fastify from "fastify";
import didRoutes from "./api/did";

const port = 8080;

const app = Fastify({ logger: true });
app.register(didRoutes, { prefix: "/api" });

app.listen({ port, host: "127.0.0.1" }).then(() => {
    console.log(`🚀 Server running at http://localhost:${port}/api`);
});

app.get("/", async () => {
    return { message: "Server is alive!" };
});