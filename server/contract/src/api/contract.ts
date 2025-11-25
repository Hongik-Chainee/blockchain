import { FastifyInstance } from "fastify";
import { PublicKey } from "@solana/web3.js";
import createContract from "../service/create";
import endContract from "../service/end";
import expireContract from "../service/expire";
import mintBadge from "../service/mint";
import { loadContract, loadBadge } from "../service/load";

export default async function contractRoutes(app: FastifyInstance) {
  app.post("/contract/create", {
    schema: {
      body: {
        type: "object",
        required: ["employer", "employee", "salary", "startDate", "dueDate"],
        properties: {
          employer: { type: "string" },
          employee: { type: "string" },
          salary: { type: "string" },
          startDate: { type: "number" },
          dueDate: { type: "number" },
        },
      },
    },
    handler: async (req, reply) => {
      const { employer, employee, salary, startDate, dueDate } = req.body as {
        employer: string;
        employee: string;
        salary: string;
        startDate: number;
        dueDate: number;
      };

      const result = await createContract(
        new PublicKey(employer),
        new PublicKey(employee),
        BigInt(salary),
        startDate,
        dueDate
      );
      reply.send(result);
    },
  });

  app.post("/contract/end", {
    schema: {
      body: {
        type: "object",
        required: ["employer", "employee", "contract", "escrow", "amount"],
        properties: {
          employer: { type: "string" },
          employee: { type: "string" },
          contract: { type: "string" },
          escrow: { type: "string" },
          amount: { type: "string" },
        },
      },
    },
    handler: async (req, reply) => {
      const { employer, employee, contract, escrow, amount } = req.body as {
        employer: string;
        employee: string;
        contract: string;
        escrow: string;
        amount: string;
      };

      const result = await endContract(
        new PublicKey(employer),
        new PublicKey(employee),
        new PublicKey(contract),
        new PublicKey(escrow),
        BigInt(amount)
      );
      reply.send(result);
    },
  });

  app.post("/contract/expire", {
    schema: {
      body: {
        type: "object",
        required: ["employer", "contract", "escrow"],
        properties: {
          employer: { type: "string" },
          contract: { type: "string" },
          escrow: { type: "string" },
        },
      },
    },
    handler: async (req, reply) => {
      const { employer, contract, escrow } = req.body as {
        employer: string;
        contract: string;
        escrow: string;
      };

      const result = await expireContract(
        new PublicKey(employer),
        new PublicKey(contract),
        new PublicKey(escrow)
      );
      reply.send(result);
    },
  });

  app.post("/badge/mint", {
    schema: {
      body: {
        type: "object",
        required: ["employee", "contract", "escrow", "level"],
        properties: {
          employee: { type: "string" },
          contract: { type: "string" },
          escrow: { type: "string" },
          level: { type: "number" },
        },
      },
    },
    handler: async (req, reply) => {
      const { employee, contract, escrow, level } = req.body as {
        employee: string;
        contract: string;
        escrow: string;
        level: number;
      };

      const result = await mintBadge(
        new PublicKey(employee),
        new PublicKey(contract),
        new PublicKey(escrow),
        level
      );

      reply.send(result);
    },
  });

  app.get("/contract/load", {
    schema: {
      querystring: {
        type: "object",
        required: ["contract"],
        properties: {
          contract: { type: "string" },
        },
      },
    },
    handler: async (req, reply) => {
      const { contract } = req.query as { contract: string };

      const result = await loadContract(new PublicKey(contract));
      reply.send(result);
    },
  });

  app.get("/badge/load", {
    schema: {
      querystring: {
        type: "object",
        required: ["badge"],
        properties: {
          badge: { type: "string" },
        },
      },
    },
    handler: async (req, reply) => {
      const { badge } = req.query as { badge: string };

      const badgeData = await loadBadge(new PublicKey(badge));
      reply.send(badgeData);
    },
  });
}
