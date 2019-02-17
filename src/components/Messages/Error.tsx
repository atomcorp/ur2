import React from 'react';
import { connect } from 'react-redux';

type ErrorType = {
  error: string;
};

const Error: React.FC<ErrorType> = (props) => (
  <section style={{ color: 'red' }}>{props.error}</section>
);

type ErrorConnectState = {
  message: {
    error: string;
  };
};

export default connect((state: ErrorConnectState) => ({
  error: state.message.error
}))(Error);
