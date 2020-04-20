import React from 'react';
import { balls } from './svgs';

export default function Balls(props) {
  const { addScore, color, points, opacity, cursor, redCount } = props;
  return (
    <div>
      <div
        style={{ opacity, cursor }}
        onClick={addScore}
        name={color}
        id={points}
      >
        {balls[color]}
        {color === 'red' ? <span>{redCount}</span> : null}
      </div>
    </div>
  );
}
