import 'dotenv/config';
import fs from 'fs';
import os from 'os';
import { Keypair } from '@solana/web3.js';
import { createVerifiableCredentialJwt } from 'did-jwt-vc';
import { EdDSASigner } from 'did-jwt';

const expandHome = (p: string) => p.replace(/^~(?=$|\/|\\)/, os.homedir());

function loadKeypairFromFile(p: string): Keypair {
    const file = expandHome(p);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(raw) || raw.length !== 64) throw new Error('Invalid keypair file');
    return Keypair.fromSecretKey(Uint8Array.from(raw));
}
const seed32 = (kp: Keypair) => kp.secretKey.slice(0, 32);

function requireEnv(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

(async () => {
    // 반드시 .env에 채워야 하는 값 (경로/문자열은 네 환경대로)
    const ISSUER_KEYFILE = requireEnv('ISSUER_KEYFILE');  // 예: ~/.config/solana/issuer.json
    const ISSUER_DID = requireEnv('ISSUER_DID');      // 예: did:sol:devnet:Issuer...
    const SUBJECT_DID = requireEnv('SUBJECT_DID');     // 예: did:sol:devnet:Holder...

    // 옵션: 타입/클레임/만료
    const VC_TYPES = (process.env.VC_TYPES ?? 'KYC').split(',').map(s => s.trim()).filter(Boolean);
    const VC_CLAIMS = JSON.parse(process.env.VC_CLAIMS ?? '{"kycStatus":"verified"}');
    const expSeconds = process.env.VC_EXP_SECONDS ? Number(process.env.VC_EXP_SECONDS) : undefined;

    const issuerKp = loadKeypairFromFile(ISSUER_KEYFILE);
    const signer = EdDSASigner(seed32(issuerKp));

    const now = Math.floor(Date.now() / 1000);
    const payload: any = {
        sub: SUBJECT_DID,
        nbf: now,
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential', ...VC_TYPES],
            credentialSubject: { id: SUBJECT_DID, ...VC_CLAIMS },
        },
    };
    if (expSeconds) payload.exp = now + expSeconds;

    const vcJwt = await createVerifiableCredentialJwt(payload, {
        did: ISSUER_DID,
        signer,
        alg: 'EdDSA',
    });

    console.log('=== VC_JWT ===\n' + vcJwt + '\n');
})();