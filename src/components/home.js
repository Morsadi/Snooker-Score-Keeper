import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Balls from './balls';

export default function Home(props) {
  const { first, second } = props.players;
  return (
    <div>
      <div id='players'>
        <div>
          <h2>{first.name}</h2>
          <h3>0</h3>
        </div>

        <div>
          <h2>{second.name}</h2>
          <h3>0</h3>
        </div>
      </div>
      <div id='action'>
        <button id='pass'>PASS</button>
        <button id='foul'>FOUL</button>
      </div>
      <div id='pointsLeft'>
        <h3>Points Left</h3>
        <h4>34</h4>
      </div>
      <div id='balls'>
        <Balls color='black' />
        <Balls color='pink' />
        <Balls color='blue' />
        <Balls color='green' />
        <Balls color='brown' />
        <Balls color='yellow' />
        <Balls color='red' />
      </div>
    </div>
  );
}
