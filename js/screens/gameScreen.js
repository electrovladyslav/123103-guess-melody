import updateTimeInState from '../functions/updateTimeInState';
import isSetsEqual from '../functions/isSetsEqual';
import decreaseLife from '../functions/decreaseLife';
import renderScreen from '../functions/renderScreen';
import {FAST_TIME, LEVELS_AMOUNT} from '../data/constants';

import timer from '../functions/timer';
import app from '../app';

import GameArtistView from '../view/gameArtistView';
import GameGenreView from '../view/gameGenreView';

class GameScreen {
  constructor(state) {
    this._state = state;
    this._level = state.levelsSet[state.currentLevel];

    if (this._level.type === `artist`) {
      this._view = new GameArtistView(state);
    }
    if (this._level.type === `genre`) {
      this._view = new GameGenreView(state);
    }
  }

  init() {
    this._timeStamp = Date.now();

    this._timerId = timer(
        this._state.time, (time) => {
          this._view.updateTimeOnScreen(time);
          this._state = updateTimeInState(this._state, time);
        }, () => {
          this.switchLevel(this._state);
        }
    );

    this._view.onAnswer = (event) => this.onAnswer(event);

    renderScreen(this._view.element);
  }

  onAnswer(event) {
    clearInterval(this._timerId);
    const answerTime = (Date.now() - this._timeStamp) / 1000;

    let newState = Object.assign({}, this._state);
    if (this.checkAnswer(event)) {
      if (answerTime < FAST_TIME) {
        newState.answers.push(`fast`);
      } else {
        newState.answers.push(`correct`);
      }
    } else {
      newState.answers.push(`wrong`);
      newState = decreaseLife(newState);
    }

    this.switchLevel(newState);
  }

  checkAnswer(event) {
    let isRight;
    if (this._level.type === `artist`) {
      isRight = (event.currentTarget.dataset.artist === this._view._level.rightAnswer);
    }
    if (this._level.type === `genre`) {
      isRight = isSetsEqual(this._view._auxTriggersStore, this._view._level.rightAnswer);
    }
    return isRight;
  }

  switchLevel(state) {
    if ((state.lives === 0) || (state.time <= 0)) {
      app.showResult(state);
      return;
    }

    let newState = Object.assign({}, state, {
      currentLevel: state.currentLevel + 1
    });

    if (newState.currentLevel < LEVELS_AMOUNT) {
      app.showNextScreen(newState);
    } else if (newState.currentLevel === LEVELS_AMOUNT) {
      app.showResult(newState);
    } else {
      throw new RangeError(`Incorrect levels number`);
    }
  }

}

export default GameScreen;
