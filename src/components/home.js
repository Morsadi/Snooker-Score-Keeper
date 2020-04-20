import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Balls from './balls';
import Foul from './foul';

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
    redCount
  } = props;

  return (
    <div>
      <div id='players'>
        <div name='first' onClick={activatePlayer}>
          <span
            style={{
              opacity: activePlayer === 'first' ? 1 : 0.6
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
              opacity: activePlayer === 'second' ? 1 : 0.6
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
          opacity={ballStatus === 'colorOn' ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='black'
          points={7}
        />
        <Balls
          opacity={ballStatus === 'colorOn' ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='pink'
          points={6}
        />
        <Balls
          opacity={ballStatus === 'colorOn' ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='blue'
          points={5}
        />
        <Balls
          opacity={ballStatus === 'colorOn' ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='green'
          points={4}
        />
        <Balls
          opacity={ballStatus === 'colorOn' ? 1 : 0.6}
          cursor={ballStatus === 'colorOn' ? 'pointer' : 'auto'}
          addScore={addScore}
          color='brown'
          points={3}
        />
        <Balls
          opacity={ballStatus === 'colorOn' ? 1 : 0.6}
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
    </div>
  );
}
