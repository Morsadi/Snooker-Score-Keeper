import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Balls from './balls';
import Foul from './foul';
import GameOver from './gameOver';

export default function Home(props) {
  const { first, second } = props.players;
  const {
    addScore,
    activatePlayer,
    activePlayer,
    closeFoul,
    foul,
    openFoul,
    submitFoul,
    totalScore,
    ballStatus,
    handleChecks,
    redCount,
    newGame,
    toggleEndGame,
    endGame,
    players,
    gameOver,
  } = props;

  return (
    <div>
      <div id='players'>
        <div name='first' onClick={activatePlayer}>
          <span
            style={{
              opacity: activePlayer === 'first' ? 1 : 0.6,
            }}
          >
            <h2>{first.name}</h2>
            <h3>{first.score}</h3>
            {/* show the score difference if negative */}
            <span>
              {first.score - second.score < 0
                ? `( ${first.score - second.score} )`
                : null}
            </span>
          </span>
        </div>

        <div name='second' onClick={activatePlayer}>
          <span
            style={{
              opacity: activePlayer === 'second' ? 1 : 0.6,
            }}
          >
            <h2>{second.name}</h2>
            <h3>{second.score}</h3>
            <span>
              {/* show the score difference if negative */}
              {first.score - second.score > 0
                ? `( -${first.score - second.score} )`
                : null}
            </span>
          </span>
        </div>
      </div>
      <div id='action'>
        {/* use the attribute name to reffer to the next player */}
        <button
          onClick={activatePlayer}
          name={activePlayer === 'first' ? 'second' : 'first'}
          id='pass'
        >
          PASS
        </button>
        <button onClick={openFoul} id='foulBtn'>
          FOUL
        </button>
      </div>
      <div id='pointsLeft'>
        <h3>Points Left</h3>
        <h4>{totalScore}</h4>
      </div>
      <div id='balls'>
        <Balls
          // if the ballstatus was colorOn, increase the opacity of colored balls
          // if the balsatus was redOn, increase the opacity of the red ball
          // if the ballstatus matches any of the colored balls, lightup that ball
          opacity={ballStatus === 'colorOn' || ballStatus === 7 ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='black'
          points={7}
        />
        <Balls
          opacity={ballStatus === 'colorOn' || ballStatus === 6 ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='pink'
          points={6}
        />
        <Balls
          opacity={ballStatus === 'colorOn' || ballStatus === 5 ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='blue'
          points={5}
        />
        <Balls
          opacity={ballStatus === 'colorOn' || ballStatus === 4 ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='green'
          points={4}
        />
        <Balls
          opacity={ballStatus === 'colorOn' || ballStatus === 3 ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='brown'
          points={3}
        />
        <Balls
          opacity={ballStatus === 'colorOn' || ballStatus === 2 ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='yellow'
          points={2}
        />
        <Balls
          opacity={ballStatus === 'redOn' ? 1 : 0.6}
          cursor={ballStatus === 'redOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='red'
          points={1}
          redCount={redCount}
        />
      </div>
      {foul.isFoul ? (
        <Foul
          handleChecks={handleChecks}
          closeFoul={closeFoul}
          submitFoul={submitFoul}
          foul={foul}
        />
      ) : null}
      <div
        className='confirmEndGame'
        style={{ position: 'absolute', display: endGame ? 'block' : 'none' }}
      >
        <h3>Are you sure you want to end the game?</h3>
        <button onClick={newGame}>Yes</button>
        <button onClick={toggleEndGame}>No</button>
      </div>

      <svg
        id='endGameBtn'
        onClick={toggleEndGame}
        width='37'
        height='38'
        viewBox='0 0 37 38'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1.23223 17.2322C0.255922 18.2085 0.255922 19.7915 1.23223 20.7678L17.1421 36.6777C18.1184 37.654 19.7014 37.654 20.6777 36.6777C21.654 35.7014 21.654 34.1184 20.6777 33.1421L6.53553 19L20.6777 4.85786C21.654 3.88155 21.654 2.29864 20.6777 1.32233C19.7014 0.34602 18.1184 0.34602 17.1421 1.32233L1.23223 17.2322ZM37 16.5L3 16.5V21.5L37 21.5V16.5Z'
          fill='white'
        />
      </svg>
      <GameOver players={players} gameOver={gameOver} newGame={newGame} />
    </div>
  );
}
