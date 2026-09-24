/** Staffelung fuer Geschwister-Bloecke: 70 ms, maximal ~350 ms. */
export function stagger(index: number) {
  return Math.min(index * 0.07, 0.35);
}
