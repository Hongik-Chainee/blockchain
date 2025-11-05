import { FastifyInstance } from "fastify";
import { PublicKey } from "@solana/web3.js";
import issueVc from "../service/issue-vc";
import KycSubject from "shared/src/type/kyc";

export default async function vcRoutes(app: FastifyInstance) {
    app.post("/vc/issue", {
        schema: {
            body: {
                type: "object",
                required: ["holder", "subject"],
                properties: {
                    holder: { type: "string", minLength: 32 },
                    subject: {
                        type: "object",
                        required: ["kyc", "verifiedAt", "provider", "method"],
                        properties: {
                            kyc: { const: true },
                            verifiedAt: { type: "string" },
                            provider: { type: "string" },
                            method: {
                                type: "array",
                                items: { type: "string" }
                            }
                        }
                    }
                }
            }
        },
        handler: async (req, reply) => {
            const { holder, subject } = req.body as {
                holder: string;
                subject: KycSubject;
            };
            const authority = new PublicKey(holder);
            const result = await issueVc(authority, subject);
            return reply.send(result);
        }
    });
}