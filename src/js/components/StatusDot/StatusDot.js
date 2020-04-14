import React from 'react';

const StatusDot = ({ status }) => (
  <span className={`dot dot--${status}`}></span>
);

export default StatusDot;
