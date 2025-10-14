import 'dotenv/config';
import { readFileSync } from 'fs';
import { Connection, Keypair } from '@solana/web3.js';
import * as solDid from '@identity.com/sol-did-client';
import { parseCluster, clusterEndpoint, defaultCommitment } from '../../../shared/src/config/cluster.ts';

const { DidSolIdentifier, DidSolService } = solDid as any;

const KEYFILE = process.env.HOLDER_KEYFILE!;
const CLUSTER = parseCluster(process.env.CLUSTER);

function loadKey(path: string): Keypair {
    const arr = JSON.parse(readFileSync(path, 'utf8')) as number[];
    return Keypair.fromSecretKey(Uint8Array.from(arr));
}

(async () => {
    const authority = loadKey(KEYFILE);
    const endpoint = clusterEndpoint(CLUSTER);
    const commitment = defaultCommitment(CLUSTER);
    const connection = new Connection(endpoint, { commitment });

    const didId = DidSolIdentifier.create(authority.publicKey, CLUSTER);
    const svc = DidSolService.build(didId).withConnection(connection);

    const doc = await svc.resolve();
    if (!doc) {
        console.log('❌ DID Document not found.');
        return;
    }
    console.log('✅ DID Document:\n');
    console.log(JSON.stringify(doc, null, 2));
})();