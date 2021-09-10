export function lerp(a: number, b: number, v: number): number {
  return a + (b - a) * v;
}

export function map(a: number, b: number, c: number, d: number, v: number): number {
  return c + (v - a) / (b - a) * (d - c);
}
