import { DIDDocument } from "did-resolver";

const VERSION_RE = /^(.+?)-v(\d+)$/;

function extractFragment(id: string): string | null {
    const hash = id.indexOf("#");

    return hash >= 0 ? id.slice(hash + 1) : null;
}

export function currentFragment(
    base: string,
    frags: Iterable<string>
): string | null {
    let max = 0;

    for (const frag of frags) {
        const m = frag.match(VERSION_RE);
        if (m && m[1] === base) {
            const n = Number(m[2]);
            if (Number.isInteger(n) && n > max) max = n;
        }
    }

    return max > 0 ? `${base}-v${max}` : null;
}

export function newFragment(
    base: string,
    frags: Iterable<string>
): string {
    let maxVer = 0;

    for (const frag of frags) {
        const m = frag.match(VERSION_RE);
        if (m && m[1] === base) {
            const n = Number(m[2]);
            if (Number.isInteger(n) && n > maxVer) maxVer = n;
        }
    }

    return `${base}-v${maxVer + 1}`;
}

export function collectFragments(
    doc: DIDDocument,
    base: string
): string[] {
    const out: string[] = [];

    for (const vm of doc.verificationMethod ?? []) {
        const frag = extractFragment(vm.id);
        if (!frag) continue;

        const m = frag.match(VERSION_RE);
        if (m && m[1] === base) {
            const n = Number(m[2]);
            if (Number.isInteger(n) && n >= 1) out.push(frag);
        }
    }

    return out;
}