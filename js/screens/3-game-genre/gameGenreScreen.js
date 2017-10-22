import GameGenreView from './gameGenreView';
import decreaseLife from '../../functions/decreaseLife';
import switchLevel from '../../functions/switchLevel';
import isSetsEqual from '../../functions/isSetsEqual';
import updateTimeInState from '../../functions/updateTimeInState';
import timer from '../../functions/timer';
import renderScreen from '../../functions/renderScreen';
import GameScreen from '../gameScreen';

class GameGenreScreen extends GameScreen {
  constructor(state) {
    super(state);
    this._view = new GameGenreView(state);
  }

  init() {
    super.init();
    this._view.onAnswer = () => {
      clearInterval(this._timerId);
      let newState = Object.assign({}, this._state);
      if (isSetsEqual(this._view._auxTriggersStore, this._view._level.rightAnswer)) {
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

export default GameGenreScreen;
