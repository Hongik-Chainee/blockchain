import 'dotenv/config';
import { readFileSync } from 'fs';
import { Connection, Keypair, Transaction } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import * as solDid from '@identity.com/sol-did-client';
import { parseCluster, clusterEndpoint, defaultCommitment } from 'shared/src/config/cluster.ts';
import { sanitize } from 'shared/src/utils/tx-sanitize.ts';

const {
    DidSolIdentifier,
    DidSolService,
    VerificationMethodType,
    BitwiseVerificationMethodFlag,
} = solDid as any;

const HOLDER_KEYFILE = process.env.HOLDER_KEYFILE!;
const ISSUER_KEYFILE = process.env.ISSUER_KEYFILE!;
const CLUSTER = parseCluster(process.env.CLUSTER);
const BASE_FRAGMENT = process.env.FRAGMENT || 'default';

function loadKey(path: string): Keypair {
    const arr = JSON.parse(readFileSync(path, 'utf8')) as number[];
    return Keypair.fromSecretKey(Uint8Array.from(arr));
}

(async () => {
    const authority = loadKey(HOLDER_KEYFILE);
    const server = loadKey(ISSUER_KEYFILE);
    const endpoint = clusterEndpoint(CLUSTER);
    const commitment = defaultCommitment(CLUSTER);
    const connection = new Connection(endpoint, { commitment });

    const wallet = new anchor.Wallet(server);
    const provider = new anchor.AnchorProvider(connection, wallet, { commitment });
    anchor.setProvider(provider);

    const didId = DidSolIdentifier.create(authority.publicKey, CLUSTER);
    const svc = DidSolService.build(didId)
        .withConnection(connection)
        .withSolWallet(wallet)
        .withAutomaticAlloc(wallet.publicKey);

    const acc = await svc.getDidAccount();
    if (acc) {
        if (acc.deactivated) { throw new Error('This DID is deactivated.'); }
        throw new Error(`DID already exists: ${didId.toString()}`);
    }

    const txInit = await svc.initialize().transaction();
    sanitize(txInit, wallet.publicKey);
    const sigInit = await provider.sendAndConfirm(txInit, [authority]);

    const txVm = await svc.addVerificationMethod({
        fragment: BASE_FRAGMENT,
        keyData: authority.publicKey.toBuffer(),
        methodType: VerificationMethodType.Ed25519VerificationKey2018,
        flags: [
            BitwiseVerificationMethodFlag.Authentication,
            BitwiseVerificationMethodFlag.CapabilityInvocation,
        ],
    }, authority.publicKey).transaction();
    sanitize(txVm, wallet.publicKey);
    const sigVm = await provider.sendAndConfirm(txVm, [authority]);

    console.log('DID ready: ', didId.toString());
    console.log('sig(init)=', sigInit);
    console.log('sig(vm)=', sigVm);
})();

/* DID는 한 번 deactivate하면 다시 activate하는 것이 불가능하다.
따라서 DID를 deactivate해야 하는 상황(회원탈퇴, 지갑변경)에는
이후 동일한 지갑을 다시 사용할 수 없음을 사용자에게 고지해야 한다. */