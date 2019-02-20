import React from 'react';
import {
  moveTokenThunk,
  previewTokenMoveThunk,
} from '../../store/playerReducer';
import { endPreviewMove } from '../../store/actions';

import { TokenType, PositionType, PlayerType } from '../../types';
import { PLAYER } from '../../utilities/playerHelpers';
import css from './Token.module.css';
import { connect } from 'react-redux';

type TokenProps = {
  token: TokenType;
  previewed?: boolean;
  squareId?: PositionType;
  moveTokenThunk: any;
  previewTokenMoveThunk: any;
  endPreviewMove: () => void;
  canMove: boolean;
};

const Token: React.FC<TokenProps> = (props) => (
  <section
    className={`${css.container} ${props.previewed ? css.preview : ''}`}
    onMouseEnter={
      props.canMove
        ? () => {
            props.previewTokenMoveThunk({
              player: props.token,
              position: props.squareId,
            });
          }
        : undefined
    }
    onMouseLeave={props.canMove ? () => props.endPreviewMove() : undefined}
    onClick={
      props.canMove
        ? () =>
            props.moveTokenThunk({
              player: props.token,
              position: props.squareId,
              token: props.token,
            })
        : undefined
    }
  >
    {props.token === PLAYER.ONE ? '♟' : '♙'}
  </section>
);

type ConnectProps = {
  token: PlayerType;
};

type ConnectState = {
  [PLAYER.ONE]: {
    canMove: boolean;
  };
  [PLAYER.TWO]: {
    canMove: boolean;
  };
};

export default connect(
  (state: ConnectState, ownProps: ConnectProps) => ({
    canMove: state[ownProps.token].canMove,
  }),
  { moveTokenThunk, previewTokenMoveThunk, endPreviewMove }
)(Token);
