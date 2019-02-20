import React from 'react';
import { connect } from 'react-redux';

import { Token } from '../';
import { TokenType, PlayerType } from '../../types';
import { PLAYER } from '../../utilities/playerHelpers';
import {
  previewTokenMoveThunk,
  endPreviewMove,
  moveTokenThunk,
} from '../../store/playerReducer';

type AreaProps = {
  title: string;
  tokens: number;
  type: 'startArea' | 'finishArea';
  player: PlayerType;
  onMouseOver: boolean;
  onClick: boolean;
  previewTokenMoveThunk: (props: any) => void;
  endPreviewMove: () => void;
  moveTokenThunk: (props: any) => void;
  canMove: boolean;
};

const Area: React.FC<AreaProps> = (props) => (
  <section
    onMouseEnter={
      props.onMouseOver && props.canMove
        ? () =>
            props.previewTokenMoveThunk({
              player: props.player,
              position: 'start',
            })
        : undefined
    }
    onMouseLeave={
      props.onMouseOver && props.canMove
        ? () => props.endPreviewMove()
        : undefined
    }
    onClick={
      props.onMouseOver && props.canMove
        ? () =>
            props.moveTokenThunk({ player: props.player, position: 'start' })
        : undefined
    }
  >
    {props.title}
    {/* props.tokens.map((token) => (
      <Token key={token.player + token.piece} token={token} />
    )) */}
    <div>{props.tokens}</div>
  </section>
);

type ConnectState = {
  [PLAYER.ONE]: {
    startArea: number;
    finishArea: number;
    canMove: boolean;
  };
  [PLAYER.TWO]: {
    startArea: number;
    finishArea: number;
    canMove: boolean;
  };
};

type ConnectProps = {
  player: PlayerType;
  type: 'startArea' | 'finishArea';
};

export default connect(
  (state: ConnectState, ownProps: ConnectProps) => ({
    tokens: state[ownProps.player][ownProps.type],
    canMove:
      state[ownProps.player].canMove && state[ownProps.player].startArea > 0,
  }),
  { previewTokenMoveThunk, endPreviewMove, moveTokenThunk }
)(Area);
