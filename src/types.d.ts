import { PLAYER } from './utilities/playerHelpers';

export type PLAYER = 'PLAYER_ONE' | 'PLAYER_TWO';

export type TokenType = {
  player: PLAYER;
  piece: number;
};
