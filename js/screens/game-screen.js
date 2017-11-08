import {renderScreen} from '../data/utuls';
import {FAST_TIME, LEVELS_AMOUNT} from '../data/constants';

import timer from '../data/timer';
import app from '../app';

import GameArtistView from '../view/game-artist-view';
import GameGenreView from '../view/game-genre-view';

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

    this._view.onAnswer = (answeredValue) => this.onAnswer(answeredValue);

    renderScreen(this._view.element);
  }

  onAnswer(answeredValue) {
    const answerTime = (Date.now() - this._timeStamp) / 1000;
    const newState = Object.assign({}, this._state);
    let answer;

    clearInterval(this._timerId);

    if (this._view.playingNow) {
      this._view.playingNow.pause();
    }

    if (this.checkAnswer(answeredValue)) {
      answer = (answerTime < FAST_TIME) ? `fast` : `correct`;
    } else {
      answer = `wrong`;
      newState.lives--;
    }
    newState.answers.push(answer);

    this.switchLevel(newState);
  }

  checkAnswer(answeredValue) {
    if (this._level.type === `artist`) {
      return (answeredValue === this._view._level.rightAnswer);
    }

    if (this._level.type === `genre`) {
      for (let i = 0; i < answeredValue.length; i += 1) {
        if (answeredValue[i] !== this._view._level.rightAnswer) {
          return false;
        }
      }
      return true;
    }

    throw new TypeError(`Wrong type of the level`);
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
