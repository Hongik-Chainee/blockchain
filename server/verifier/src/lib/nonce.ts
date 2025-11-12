import { SignJWT, jwtVerify } from "jose";
import { randomBytes } from "crypto";

export async function createNonce(
  secret: Uint8Array,
  payload: Record<string, any>,
  ttl: number
) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttl;
  const jti = randomBytes(8).toString("hex");

  const jwt = await new SignJWT({ ...payload, jti })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(secret);

  return { jwt, exp };
}

export async function verifyNonce(secret: Uint8Array, jwt: string) {
  const { payload } = await jwtVerify(jwt, secret);

  return payload;
}
