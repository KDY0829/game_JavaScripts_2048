export function getTileBg(v) {
  const m = {
    0: 0xeee4da,
    2: 0xeee4da,
    4: 0xede0c8,
    8: 0xf2b179,
    16: 0xf59563,
    32: 0xf67c5f,
    64: 0xf65e3b,
    128: 0xedcf72,
    256: 0xedcc61,
    512: 0xedc850,
    1024: 0xedc53f,
    2048: 0xedc22e,
    4096: 0x3c3a32,
    8192: 0x3c3a32,
  };
  return m[v] || 0x3c3a32;
}
export function getTileFg(v) {
  return v >= 8 ? "#f9f6f2" : "#776e65";
}
