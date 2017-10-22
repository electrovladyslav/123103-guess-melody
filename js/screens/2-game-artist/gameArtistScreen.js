import GameArtistView from './gameArtistView';
import decreaseLife from '../../functions/decreaseLife';
import switchLevel from '../../functions/switchLevel';
import updateTimeInState from '../../functions/updateTimeInState';
import timer from '../../functions/timer';
import renderScreen from '../../functions/renderScreen';

class GameArtistScreen {
  constructor(state) {
    this._state = state;
    this._view = new GameArtistView(state);
  }

  init() {
    this._timerId = timer(
        this._state.time, (time) => {
          this._view.updateTimeOnScreen(time);
          this._state = updateTimeInState(this._state, time);
        }, () => {
          switchLevel(this._state);
        }
    );

    this._view.onAnswer = () => {
      clearInterval(this._timerId);
      let newState = Object.assign({}, this._state);
      if (event.currentTarget.dataset.artist === this._view._level.rightAnswer) {
        newState.answers.push(`correct`);
      } else {
        newState.answers.push(`wrong`);
        newState = decreaseLife(newState);
      }

      switchLevel(newState);
    };

    renderScreen(this._view.element);
  }
}

export default GameArtistScreen;
