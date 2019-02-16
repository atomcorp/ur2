export const player1PositionMap = [
  'start',
  'c3',
  'c2',
  'c1',
  'a0',
  'b0',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'b7',
  'c7',
  'c6',
  'finish'
];

export const player2PositionMap = [
  'start',
  'a3',
  'a2',
  'a1',
  'a0',
  'b0',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'b7',
  'a7',
  'a6',
  'finish'
];

const PLAYER = {
  ONE: 'PLAYER_ONE',
  TWO: 'PLAYER_TWO'
};

const generatePlayerPieces = (player: string) => {
  return Array(6)
    .fill(0)
    .map((_, i) => `${player}_PIECE_${i}`);
};

const PLAYER_ONE_PIECES = generatePlayerPieces(PLAYER.ONE);
const PLAYER_TWO_PIECES = generatePlayerPieces(PLAYER.TWO);
