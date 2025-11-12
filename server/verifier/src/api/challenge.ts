import { FastifyInstance } from "fastify";
import { PublicKey } from "@solana/web3.js";
import issueChallenge from "../service/issue-challenge";
import verifyChallenge from "../service/verify-challenge";

export default async function challengeRoutes(app: FastifyInstance) {
  app.post("/challenge/issue", {
    schema: {
      body: {
        type: "object",
        required: ["holder", "domain"],
        properties: {
          holder: { type: "string", minLength: 32 },
          domain: { type: "string", minLength: 1 },
        },
      },
    },
    handler: async (req, reply) => {
      const { holder, domain } = req.body as { holder: string; domain: string };
      const authority = new PublicKey(holder);
      const result = await issueChallenge(domain, authority);
      return reply.send(result);
    },
  });

  app.post("/challenge/verify", {
    schema: {
      body: {
        type: "object",
        required: ["holder", "domain", "nonce", "vc", "vp"],
        properties: {
          holder: { type: "string", minLength: 32 },
          domain: { type: "string", minLength: 1 },
          nonce: { type: "string", minLength: 1 },
          vc: { type: "string", minLength: 1 },
          vp: { type: "string", minLength: 1 },
        },
      },
    },
    handler: async (req, reply) => {
      const { holder, domain, nonce, vc, vp } = req.body as {
        holder: string;
        domain: string;
        nonce: string;
        vc: string;
        vp: string;
      };
      const authority = new PublicKey(holder);
      const result = await verifyChallenge(nonce, vc, vp, domain, authority);
      return reply.send(result);
    },
  });
}
