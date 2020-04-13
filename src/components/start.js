import React from 'react';
import { balls } from './svgs';

export default function Start(props) {
  const { startGame, eventHandler, players } = props;
  console.log(eventHandler);
  console.log(players);
  return (
    <div id='start'>
      {balls.logo}
      <form>
        <input
          value={players.first.name}
          onChange={eventHandler}
          name='first'
          type='text'
          placeholder='Player 1'
          required
        />
        <input
          value={players.second.name}
          onChange={eventHandler}
          name='second'
          type='text'
          placeholder='Player 2'
          required
        />
        <input onClick={startGame} id='submit' type='submit' value='START' />
      </form>
    </div>
  );
}
