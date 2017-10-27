import updateTimeInState from '../functions/updateTimeInState';
import timer from '../functions/timer';
import getRandomArrElem from '../functions/getRandomArrElem';
import {LEVELS_AMOUNT} from '../data/constants';
import app from '../app';


class GameScreen {
  constructor(state) {
    this._state = state;
  }

  init() {
    this._timerId = timer(
        this._state.time, (time) => {
          this._view.updateTimeOnScreen(time);
          this._state = updateTimeInState(this._state, time);
        }, () => {
          this.switchLevel(this._state);
        }
    );
  }

  switchLevel(state) {
    if ((state.lives === 0) || (state.time <= 0)) {
      app.showResult(state);
      return;
    }

    const nextLevels = [
      app.showArtistScreen,
      app.showGenreScreen
    ];

    let newState = Object.assign({}, state, {
      currentLevel: state.currentLevel + 1
    });

    if (newState.currentLevel <= LEVELS_AMOUNT) {
      getRandomArrElem(nextLevels)(newState);
    } else if (newState.currentLevel > LEVELS_AMOUNT) {
      app.showResult(newState);
    }
  }

}

export default GameScreen;
