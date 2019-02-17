import React from 'react';
import { connect } from 'react-redux';

import { Token } from '../';
import { TokenType, PLAYER as PLAYER_TYPE } from '../../types';
import { PLAYER } from '../../utilities/playerHelpers';
import {
  previewStartTokenMoveThunk,
  endPreviewMove
} from '../../store/reducers/playerReducer';

type AreaProps = {
  title: string;
  tokens: TokenType[];
  type: 'startArea' | 'finishArea';
  player: PLAYER_TYPE;
  onMouseOver: boolean;
  onClick: boolean;
  previewStartTokenMoveThunk: (props: any) => void;
  endPreviewMove: () => void;
};

const Area: React.FC<AreaProps> = (props) => (
  <section
    onMouseEnter={() =>
      props.previewStartTokenMoveThunk({
        player: props.player,
        position: props.type
      })
    }
    onMouseLeave={() => props.endPreviewMove()}
    onClick={props.onClick ? () => null : undefined}
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
  { previewStartTokenMoveThunk, endPreviewMove }
)(Area);
