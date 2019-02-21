import React from 'react';
import {
  moveTokenThunk,
  previewTokenMoveThunk,
} from '../../store/playerReducer';
import { endPreviewMove } from '../../store/actions';

import { PositionType, PlayerType } from '../../types';
import { PLAYER } from '../../utilities/playerHelpers';
import css from './Token.module.css';
import { connect } from 'react-redux';

type TokenProps = {
  player: PlayerType;
  previewed?: boolean;
  squareId?: PositionType;
  moveTokenThunk: (props: any) => void;
  previewTokenMoveThunk: (props: any) => void;
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
              player: props.player,
              position: props.squareId,
            });
          }
        : undefined
    }
    onMouseLeave={props.canMove ? () => props.endPreviewMove() : undefined}
    onClick={
      props.canMove && !props.previewed
        ? () =>
            props.moveTokenThunk({
              player: props.player,
              position: props.squareId,
            })
        : undefined
    }
  >
    {props.player === PLAYER.ONE ? '♟' : '♙'}
  </section>
);

type ConnectProps = {
  player: PlayerType;
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
    canMove: state[ownProps.player].canMove,
  }),
  { moveTokenThunk, previewTokenMoveThunk, endPreviewMove }
)(Token);
