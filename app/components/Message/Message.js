import React, { PropTypes } from 'react';

function Message({ type, txt }) {
  return (<div className={`alert alert-${type}`}>
    {txt}
  </div>);
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
};

export default Message;
