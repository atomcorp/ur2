export const BOARD_KEYS = Array(3)
  .fill(0)
  .map((_, i) =>
    Array(8)
      .fill(0)
      .map((_, x) => String.fromCharCode(97 + i) + x)
  );
