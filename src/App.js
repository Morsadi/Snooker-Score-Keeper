import React, { Component } from 'react';
import Home from './components/home';
import Start from './components/start';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: 147,
      redCount: 15,
      isHomeOn: false,
      ballStatus: 'redOn',
      formValidation: false,
      activePlayer: 'first',
      foul: {
        isFoul: false,
        points: '4',
        removeRed: false,
        freeBall: false,
      },
      players: {
        first: {
          isValid: false,
          name: '',
          game: [0],
          score: 0,
        },
        second: {
          isValid: false,
          name: '',
          game: [0],
          score: 0,
        },
      },
      endGame: false,
      gameOver: false,
    };
  }

  eventHandler = (e) => {
    const { players } = this.state;
    const player = e.currentTarget.name;
    const value = e.currentTarget.value;
    const validity = e.currentTarget.checkValidity();
    this.setState({
      players: {
        ...players,
        [player]: {
          ...players[player],
          isValid: validity,
          name: value,
        },
      },
    });
  };

  startGame = (e) => {
    // e.preventDefault();
    const { players } = this.state;
    if (players.first.isValid && players.second.isValid) {
      this.setState({
        isHomeOn: true,
      });
    }
  };

  openFoul = () => {
    this.setState({
      foul: {
        ...this.state.foul,
        isFoul: true,
      },
    });
  };

  closeFoul = () => {
    this.setState({
      foul: {
        ...this.state.foul,
        isFoul: false,
      },
    });
  };

  submitFoul = () => {
    const { foul } = this.state;

    const { activePlayer, players, totalScore } = this.state;
    let oldGame = players[activePlayer].game;

    //the selected point
    const selectedPoint = `-${foul.points}`;

    //pushing the new point
    let newGame = oldGame.concat(Number(selectedPoint));

    //adding score
    let score = newGame.reduce((a, b) => a + b);

    this.setState({
      players: {
        ...players,
        [activePlayer]: {
          ...players[activePlayer],
          game: newGame,
          score,
        },
      },
      foul: {
        ...this.state.foul,
        isFoul: false,
      },
    });

    this.removeRed();

    if (foul.freeBall) {
      this.activatePlayer();
    }
  };

  removeRed = () => {
    const { redCount, foul, ballStatus } = this.state;

    ///// bug fix
    // if the removered checkbox is checked and the red count is 1, remove the last red and switch the ball status to 2
    if (redCount === 1) {
      this.setState({
        redCount: 0,
        ballStatus: 2,
        foul: {
          ...foul,
          removeRed: false,
          isFoul: false,
        },
      });
    } else if (this.state.foul.removeRed && redCount !== 0) {
      this.setState({
        redCount: redCount - 1,
        foul: {
          ...foul,
          removeRed: false,
          isFoul: false,
        },
      });
    }
  };
  handleChecks = (e) => {
    const { foul } = this.state;
    const label = e.target.getAttribute('name');
    // if the clicked input is a checkbox get the checked value, if not just get value
    const value =
      e.target.getAttribute('type') === 'checkbox'
        ? e.target.checked
        : e.target.value;

    this.setState({
      foul: {
        ...foul,
        [label]: value,
      },
    });
  };

  activatePlayer = (e) => {
    const { ballStatus, activePlayer, redCount } = this.state;

    //if the function was triggered remotely
    const player = !e
      ? activePlayer === 'first'
        ? 'second'
        : 'first'
      : e.currentTarget.getAttribute('name');

    //if the ball status is colorOn while the redCount is 0, switch to only colors
    if (ballStatus === 'colorOn' && redCount === 0) {
      this.setState({
        activePlayer: player,
        ballStatus: 2,
      });

      //else if there are more red balls, switch to the other player and set ball satus to redOn
    } else if (ballStatus === 'colorOn' || ballStatus === 'redOn') {
      this.setState({
        activePlayer: player,
        ballStatus: 'redOn',
      });
    } else {
      this.setState({
        activePlayer: player,
      });
    }
  };

  addScore = (e) => {
    const clickedPoints = Number(e.currentTarget.getAttribute('id'));

    const { ballStatus, redCount } = this.state;

    //if the color balls are on, only allow the red ball to be pressed and change ballStatus

    if (ballStatus === 'redOn' && clickedPoints === 1) {
      this.updateScore(clickedPoints, 'colorOn', true);

      //if the red ball is on, only allow the color balls to be pressed and change ballStatus
    } else if (ballStatus === 'colorOn' && clickedPoints !== 1) {
      this.updateScore(clickedPoints, 'redOn', false);

      //if red balls are all out, change the ball status to the next ball (end mode)
      if (redCount === 0) {
        this.setState({
          ballStatus: 2,
        });
      }

      //Once End Game Mode is on, only allow the appropriate ball to be clicked/pocketed.
      //Meaning: Yellow (2), Brown (3), Green (4), Blue (5), Pink (6), Black (7); all should be pocketed in order.
      // when ballSatus is "2" meaning, Yellow(2), the clicked points should only be 2. Then increment by 1 for the next ball
    } else if (ballStatus === clickedPoints) {
      this.updateScore(clickedPoints, ballStatus + 1, false);

      //once ballstatus reaches 8; meaning, all balls are pocketted, then finish the game.
    } else if (ballStatus === 8) {
      this.setState({
        gameOver: true,
      });
    }
  };

  //callback function
  updateScore = (clickedPoints, ball, isRedBall) => {
    const { activePlayer, players, totalScore, endGame, redCount } = this.state;

    //deactivate clicking when end game confirmation is on
    if (!endGame) {
      //old game set of the active player
      let oldGame = players[activePlayer].game;

      //total count
      let oldTotalScore = totalScore;

      //push the clicked ball to the game set
      let newGame = oldGame.concat(clickedPoints);

      //calculate the sum of that the game set to come up with score
      let score = newGame.reduce((a, b) => a + b);

      this.setState({
        totalScore: oldTotalScore - clickedPoints,
        ballStatus: ball,
        players: {
          ...players,
          [activePlayer]: {
            ...players[activePlayer],
            game: newGame,
            score,
          },
        },
      });
      //if red ball clicked, subtracked it from the red balss count
      if (isRedBall) {
        const { redCount } = this.state;
        this.setState({
          redCount: redCount - 1,
        });
      }
    }
  };

  toggleEndGame = () => {
    const { endGame } = this.state;
    this.setState({
      endGame: !endGame,
    });
  };

  //game reset
  newGame = () => {
    this.setState({
      totalScore: 147,
      redCount: 15,
      isHomeOn: false,
      ballStatus: 'redOn',
      formValidation: false,
      activePlayer: 'first',
      foul: {
        isFoul: false,
        points: '4',
        removeRed: false,
        freeBall: false,
      },
      players: {
        first: {
          isValid: false,
          name: '',
          game: [0],
          score: 0,
        },
        second: {
          isValid: false,
          name: '',
          game: [0],
          score: 0,
        },
      },
      endGame: false,
      gameOver: false,
    });
  };

  render() {
    const {
      isHomeOn,
      players,
      foul,
      activePlayer,
      totalScore,
      ballStatus,
      redCount,
      endGame,
      gameOver,
    } = this.state;
    return (
      <div>
        {isHomeOn ? (
          <Home
            players={players}
            foul={foul}
            openFoul={this.openFoul}
            closeFoul={this.closeFoul}
            submitFoul={this.submitFoul}
            activatePlayer={this.activatePlayer}
            activePlayer={activePlayer}
            addScore={this.addScore}
            totalScore={totalScore}
            ballStatus={ballStatus}
            handleChecks={this.handleChecks}
            redCount={redCount}
            newGame={this.newGame}
            toggleEndGame={this.toggleEndGame}
            endGame={endGame}
            gameOver={gameOver}
          />
        ) : (
          <Start
            players={players}
            startGame={this.startGame}
            eventHandler={this.eventHandler}
          />
        )}
      </div>
    );
  }
}
