import "dotenv/config";
import { Connection, PublicKey } from "@solana/web3.js";
import { DidSolIdentifier } from "@identity.com/sol-did-client";
import { makeInitTx } from "../lib/build";
import {
  parseCluster,
  clusterEndpoint,
  defaultCommitment,
} from "@config/cluster";
import { loadKey } from "@util/load";
import buildService from "@util/did";

const KEYFILE = process.env.KEYFILE!;
const CLUSTER = parseCluster(process.env.CLUSTER!);

const endpoint = clusterEndpoint(CLUSTER);
const commitment = defaultCommitment(CLUSTER);
const connection = new Connection(endpoint, { commitment });
const issuer = loadKey(KEYFILE);

export async function initializeIssuerDid() {
  const did = DidSolIdentifier.create(issuer.publicKey, CLUSTER).toString();
  const svc = buildService(connection, issuer.publicKey, CLUSTER);

  try {
    const exists = await svc.getDidAccount();
    if (exists) {
      return {
        ok: false,
        message: "DID already exists.",
      };
    }

    const { tx, blockhash, lastValidBlockHeight } = await makeInitTx(
      connection,
      issuer.publicKey,
      CLUSTER
    );
    tx.sign(issuer);

    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      commitment
    );

    return {
      ok: true,
      message: "DID initialized successfully.",
      did,
      signature,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Failed to initialize DID.",
    };
  }
}

export async function initializeHolderDid(holder: PublicKey) {
  const did = DidSolIdentifier.create(holder, CLUSTER).toString();
  const svc = buildService(connection, holder, CLUSTER);

  try {
    const exists = await svc.getDidAccount();
    if (exists) {
      return {
        ok: false,
        message: "DID already exists.",
      };
    }

    const { tx, blockhash, lastValidBlockHeight } = await makeInitTx(
      connection,
      holder,
      CLUSTER
    );
    const txBase64 = tx
      .serialize({ requireAllSignatures: false, verifySignatures: false })
      .toString("base64");

    return {
      ok: true,
      message: "Unsigned transaction built.",
      did,
      txBase64,
      blockhash,
      lastValidBlockHeight,
      commitment,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Failed to initialize DID.",
    };
  }
}
