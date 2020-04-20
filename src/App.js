import React, { Component, createRef } from 'react';
import Home from './components/home';
import Start from './components/start';
import { balls } from './components/svgs';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: 147,
      redCount: 3,
      isHomeOn: false,
      ballStatus: 'redOn',
      formValidation: false,
      activePlayer: 'first',
      foul: {
        isFoul: false,
        points: '4',
        removeRed: false,
        freeBall: false
      },
      players: {
        first: {
          isValid: false,
          name: '',
          game: [0],
          score: 0
        },
        second: {
          isValid: false,
          name: '',
          game: [0],
          score: 0
        }
      }
    };
  }

  eventHandler = e => {
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
          name: value
        }
      }
    });
  };

  startGame = e => {
    // e.preventDefault();
    const { players } = this.state;
    if (players.first.isValid && players.second.isValid) {
      this.setState({
        isHomeOn: true
      });
    }
  };

  openFoul = () => {
    this.setState({
      foul: {
        ...this.state.foul,
        isFoul: true
      }
    });
  };

  closeFoul = () => {
    this.setState({
      foul: {
        ...this.state.foul,
        isFoul: false
      }
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

    //old total score
    let oldTotalScore = totalScore;

    this.setState({
      totalScore: oldTotalScore - Number(selectedPoint),
      ballStatus: 'redOn',
      players: {
        ...players,
        [activePlayer]: {
          ...players[activePlayer],
          game: newGame,
          score
        }
      },
      foul: {
        ...this.state.foul,
        isFoul: false
      }
    });
    this.removeRed();
  };

  removeRed = () => {
    const { redCount, foul } = this.state;

    if (this.state.foul.removeRed) {
      this.setState({
        redCount: redCount - 1,
        foul: {
          ...foul,
          removeRed: false,
          isFoul: false
        }
      });
    }
  };
  handleChecks = e => {
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
        [label]: value
      }
    });
  };

  activatePlayer = e => {
    const player = e.currentTarget.getAttribute('name');

    this.setState({
      activePlayer: player,
      ballStatus: 'redOn'
    });
  };

  addScore = e => {
    const clickedPoints = Number(e.currentTarget.getAttribute('id'));

    const {
      activePlayer,
      players,
      totalScore,
      ballStatus,
      redCount
    } = this.state;
    let oldGame = players[activePlayer].game;

    let oldTotalScore = totalScore;

    //if the color balls are on, only allow the red ball to be pressed and change ballStatus

    if (ballStatus === 'redOn' && clickedPoints === 1) {
      let newGame = oldGame.concat(clickedPoints);
      let score = newGame.reduce((a, b) => a + b);

      this.setState({
        totalScore: oldTotalScore - clickedPoints,
        ballStatus: 'colorOn',
        redCount: redCount - 1,
        players: {
          ...players,
          [activePlayer]: {
            ...players[activePlayer],
            game: newGame,
            score
          }
        }
      });

      //if the red ball is on, only allow the color balls to be pressed and change ballStatus
    } else if (ballStatus === 'colorOn' && clickedPoints !== 1) {
      let newGame = oldGame.concat(clickedPoints);
      let score = newGame.reduce((a, b) => a + b);

      this.setState({
        totalScore: oldTotalScore - clickedPoints,
        ballStatus: 'redOn',
        players: {
          ...players,
          [activePlayer]: {
            ...players[activePlayer],
            game: newGame,
            score
          }
        }
      });
      console.log(clickedPoints);

      if (redCount === 0) {
        this.setState({
          ballStatus: '2'
        });
      }
    } else if (ballStatus === toString(clickedPoints)) {
      console.log('game is finished');
    }
  };

  updateScore = () => {};

  render() {
    const {
      isHomeOn,
      players,
      foul,
      activePlayer,
      totalScore,
      ballStatus,
      redCount
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
