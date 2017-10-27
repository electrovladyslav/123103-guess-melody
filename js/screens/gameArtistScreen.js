import GameArtistView from '../view/gameArtistView';
import decreaseLife from '../functions/decreaseLife';
import renderScreen from '../functions/renderScreen';
import GameScreen from './gameScreen';
import {FAST_TIME} from '../data/constants';

class GameArtistScreen extends GameScreen {
  constructor(state) {
    super(state);
    this._view = new GameArtistView(state);
    this._timeStamp = Date.now();
  }

  init() {
    super.init();
    this._view.onAnswer = () => {
      clearInterval(this._timerId);
      const answerTime = (Date.now() - this._timeStamp) / 1000;

      let newState = Object.assign({}, this._state);
      if (event.currentTarget.dataset.artist === this._view._level.rightAnswer) {
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
    };

    renderScreen(this._view.element);
  }
}

export default GameArtistScreen;
