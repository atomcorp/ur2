import { PositionType } from '../types';

const letter = (i: number) => String.fromCharCode(97 + i);

const generateBoardKeys = Array(3)
  .fill(0)
  .map((_, i) =>
    Array(8)
      .fill(0)
      .map((_, x) => String.fromCharCode(97 + i) + x)
  );

// not sure how to get typescript to understand
// generate version
export const boardKeys: PositionType[][] = [
  ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
  ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
  ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
];
