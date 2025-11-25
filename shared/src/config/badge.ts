export default function badgeUri(level: number): string {
  switch (level) {
    case 1:
      return "ipfs://bafkreihdedrgyndmj5g7xmty5abid3jnzuzhynqbvuek74ekwc2a5dwfje";
    case 2:
      return "ipfs://bafkreidp5k4pv7oapezk7i5ywrwisi3ogb3opyqrkria6loih4aj5wk7b4";
    case 3:
      return "ipfs://bafkreic2udkhbfnjjiswjcdrd3hijttrr7gshipnx4wjuhjq2b5x3rakoy";
    case 4:
      return "ipfs://bafkreibgaanfv5e22jng3kqa6duvdoeijmv6x4quil43pi7mncu2bewwdu";
    default:
      throw new Error();
  }
}
