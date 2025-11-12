import { FastifyInstance } from "fastify";
import { PublicKey } from "@solana/web3.js";
import { initializeHolderDid } from "../service/initialize";
import { addHolderVm } from "../service/add-vm";

export default async function didRoutes(app: FastifyInstance) {
  app.post("/did/init", {
    schema: {
      body: {
        type: "object",
        required: ["holder"],
        properties: { holder: { type: "string", minLength: 32 } },
      },
    },
    handler: async (req, reply) => {
      const { holder } = req.body as { holder: string };
      const authority = new PublicKey(holder);
      const result = await initializeHolderDid(authority);
      reply.send(result);
    },
  });

  app.post("/did/vm/add", {
    schema: {
      body: {
        type: "object",
        required: ["holder"],
        properties: { holder: { type: "string", minLength: 32 } },
      },
    },
    handler: async (req, reply) => {
      const { holder } = req.body as { holder: string };
      const authority = new PublicKey(holder);
      const result = await addHolderVm(authority);
      return reply.send(result);
    },
  });
}
