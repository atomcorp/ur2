import React from 'react';
import { connect } from 'react-redux';

import { Token } from '../';
import { TokenType, PLAYER as PLAYER_TYPE } from '../../types';
import { PLAYER } from '../../utilities/playerHelpers';
import {
  previewTokenMoveThunk,
  endPreviewMove,
  moveTokenThunk
} from '../../store/reducers/playerReducer';

type AreaProps = {
  title: string;
  tokens: TokenType[];
  type: 'startArea' | 'finishArea';
  player: PLAYER_TYPE;
  onMouseOver: boolean;
  onClick: boolean;
  previewTokenMoveThunk: (props: any) => void;
  endPreviewMove: () => void;
  moveTokenThunk: (props: any) => void;
};

const Area: React.FC<AreaProps> = (props) => (
  <section
    onMouseEnter={
      props.onMouseOver
        ? () =>
            props.previewTokenMoveThunk({
              player: props.player,
              position: 'start'
            })
        : undefined
    }
    onMouseLeave={props.onMouseOver ? () => props.endPreviewMove() : undefined}
    onClick={
      props.onMouseOver
        ? () =>
            props.moveTokenThunk({ player: props.player, position: 'start' })
        : undefined
    }
  >
    {props.title}
    {props.tokens.map((token) => (
      <Token key={token.player + token.piece} token={token} />
    ))}
  </section>
);

type ConnectState = {
  [PLAYER.ONE]: {
    startArea: TokenType[];
    finishArea: TokenType[];
  };
  [PLAYER.TWO]: {
    startArea: TokenType[];
    finishArea: TokenType[];
  };
};

type ConnectProps = {
  player: PLAYER_TYPE;
  type: 'startArea' | 'finishArea';
};

export default connect(
  (state: ConnectState, ownProps: ConnectProps) => ({
    tokens: state[ownProps.player][ownProps.type]
  }),
  { previewTokenMoveThunk, endPreviewMove, moveTokenThunk }
)(Area);
