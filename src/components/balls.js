import React from 'react';
import { balls } from './svgs';

export default function Balls(props) {
  const { color } = props;
  return (
    <div>
      <div className={color}>{balls[color]}</div>
    </div>
  );
}
