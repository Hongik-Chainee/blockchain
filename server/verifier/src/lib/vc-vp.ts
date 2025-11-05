import { verifyPresentation, verifyCredential } from "did-jwt-vc";

export async function verifyVc(vcJwt: string, resolver: any) {
    const verified = await verifyCredential(vcJwt, resolver);

    return verified.verifiableCredential;
}

export async function verifyVp(vpJwt: string, resolver: any) {
    const verified = await verifyPresentation(vpJwt, resolver);

    return verified.verifiablePresentation;
}
