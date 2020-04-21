import React from 'react';

export default function GameOver(props) {
  const { players, gameOver, newGame } = props;
  const winner =
    players.first.score > players.second.score
      ? players.first.name
      : players.second.name;

  return (
    <div style={{ display: gameOver ? 'block' : 'none' }} id='gameOver'>
      <h2>{winner} won the Game.</h2>

      <svg
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: '0',
        }}
        id='endGameBtn'
        onClick={newGame}
        width='37'
        height='38'
        viewBox='0 0 37 38'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1.23223 17.2322C0.255922 18.2085 0.255922 19.7915 1.23223 20.7678L17.1421 36.6777C18.1184 37.654 19.7014 37.654 20.6777 36.6777C21.654 35.7014 21.654 34.1184 20.6777 33.1421L6.53553 19L20.6777 4.85786C21.654 3.88155 21.654 2.29864 20.6777 1.32233C19.7014 0.34602 18.1184 0.34602 17.1421 1.32233L1.23223 17.2322ZM37 16.5L3 16.5V21.5L37 21.5V16.5Z'
          fill='#000'
        />
      </svg>
    </div>
  );
}
