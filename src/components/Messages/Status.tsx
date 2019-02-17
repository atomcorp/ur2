import React from 'react';
import { connect } from 'react-redux';

type StatusType = {
  status: string;
};

const Status: React.FC<StatusType> = (props) => (
  <section style={{ color: 'blue' }}>{props.status}</section>
);

type StatusConnectState = {
  message: {
    status: string;
  };
};

export default connect((state: StatusConnectState) => ({
  status: state.message.status
}))(Status);
