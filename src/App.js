import React, { Component } from 'react';
import Home from './components/home';
import Start from './components/start';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: '',
      formValidation: false,
      players: {
        first: {
          isValid: false,
          name: ''
        },
        second: {
          isValid: false,
          name: ''
        }
      }
    };
  }

  eventHandler = e => {
    const { players } = this.state;
    const label = e.currentTarget.name;
    const value = e.currentTarget.value;
    const validity = e.currentTarget.checkValidity();
    this.setState({
      players: {
        ...players,
        [label]: {
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
        activePage: 'home'
      });
    }
  };
  render() {
    const { activePage, players } = this.state;
    return (
      <div>
        {activePage == 'home' ? (
          <Home players={players} />
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
