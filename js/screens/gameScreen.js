import {renderScreen} from '../data/utuls';
import {FAST_TIME, LEVELS_AMOUNT} from '../data/constants';

import timer from '../data/timer';
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
          this._state = Object.assign({}, this._state, {
            time
          });
        }, () => {
          this.switchLevel(this._state);
        }
    );

    this._view.onAnswer = (event) => this.onAnswer(event);

    renderScreen(this._view.element);
  }

  onAnswer(event) {
    const answerTime = (Date.now() - this._timeStamp) / 1000;
    const newState = Object.assign({}, this._state);
    let answer;

    clearInterval(this._timerId);

    if (this._view.playingNow) {
      this._view.playingNow.pause();
    }

    if (this.checkAnswer(event)) {
      answer = (answerTime < FAST_TIME) ? `fast` : `correct`;
    } else {
      answer = `wrong`;
      newState.lives--;
    }
    newState.answers.push(answer);

    this.switchLevel(newState);
  }

  checkAnswer(event) {
    let isRight;
    if (this._level.type === `artist`) {
      isRight = (event.currentTarget.dataset.artist === this._view._level.rightAnswer);
    }
    if (this._level.type === `genre`) {
      isRight = ((this._view._auxTriggersStore.size === 1)
      && (this._view._auxTriggersStore[0] === this._view._level.rightAnswer));
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
