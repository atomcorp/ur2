import { PLAYER as PLAYER_TYPE } from '../types';

export const PLAYER: {
  ONE: 'PLAYER_ONE';
  TWO: 'PLAYER_TWO';
} = {
  ONE: 'PLAYER_ONE',
  TWO: 'PLAYER_TWO',
};

const player1PositionMap = [
  'start',
  'c3',
  'c2',
  'c1',
  'c0',
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
  'finish',
];

const player2PositionMap = [
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
  'finish',
];

export const POSITION_MAP: {
  PLAYER_ONE: string[];
  PLAYER_TWO: string[];
} = {
  [PLAYER.ONE]: player1PositionMap,
  [PLAYER.TWO]: player2PositionMap,
};

export const generatePlayerPieces = (player: string) => {
  return Array(6)
    .fill(0)
    .map((_, i) => ({
      player: player,
      piece: i,
    }));
};

// const PLAYER_ONE_PIECES = generatePlayerPieces(PLAYER.ONE);
// const PLAYER_TWO_PIECES = generatePlayerPieces(PLAYER.TWO);

export const getPlayerPiece = (player: string, piece: number) =>
  `${player}_PIECE_${piece}`;

type areaType = {
  player: PLAYER_TYPE;
  type: 'startArea' | 'finishArea';
  title: string;
  canInteract: boolean;
}[];

export const areaMap: areaType = [
  {
    canInteract: true,
    title: 'Player one start',
    player: PLAYER.ONE,
    type: 'startArea',
  },
  {
    canInteract: true,
    title: 'Player two start',
    player: PLAYER.TWO,
    type: 'startArea',
  },
  {
    canInteract: false,
    title: 'Player one finish',
    player: PLAYER.ONE,
    type: 'finishArea',
  },
  {
    canInteract: false,
    title: 'Player two finish',
    player: PLAYER.TWO,
    type: 'finishArea',
  },
];

export const oppositePlayer = (currentPlayer: PLAYER_TYPE) => {
  if (currentPlayer === PLAYER.ONE) {
    return PLAYER.TWO;
  }
  return PLAYER.ONE;
};

const specialSquares = ['c0', 'a0', 'b3', 'c6', 'a6'];

export const positionIsSpecialSquare = (position: string) =>
  specialSquares.find((specialSquare) => specialSquare === position);
