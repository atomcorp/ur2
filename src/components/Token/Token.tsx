import React from 'react';
import {
  moveTokenThunk,
  previewTokenMoveThunk,
  endPreviewMove
} from '../../store/reducers/playerReducer';
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
};

const Token: React.FC<TokenProps> = (props) => (
  <section
    className={`${css.container} ${props.previewed ? css.preview : ''}`}
    onMouseEnter={() => {
      props.previewTokenMoveThunk({
        player: props.token.player,
        position: props.squareId
      });
    }}
    onMouseLeave={() => props.endPreviewMove()}
    onClick={() =>
      props.moveTokenThunk({
        player: props.token.player,
        position: props.squareId,
        token: props.token
      })
    }
  >
    {props.token.player === PLAYER.ONE ? '♟' : '♙'}
  </section>
);

export default connect(
  (state) => ({}),
  { moveTokenThunk, previewTokenMoveThunk, endPreviewMove }
)(Token);
