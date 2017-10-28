import renderScreen from '../functions/renderScreen';
import calcPoints from '../functions/calcPoints';

import ResultView from '../view/resultView';
import app from '../app';
import Loader from '../loader';

export default class {
  constructor(state) {
    this._view = new ResultView(state);
    this._state = state;
  }

  init() {
    this._view.switchToNextScreen = () => {
      app.startGame();
    };

    if ((this._state.lives > 0) || (this._state.time > 0)) {
      this._view.points = calcPoints(this._state.answers, this._state.lives);
      Loader.loadResults()
          .then((results) => {
            this._view.otherResults = results;
          })
          .then(() => {
            Loader.saveResults({
              time: this._state.time,
              points: this._view.points
            }).then(() => {
              renderScreen(this._view.element);
            });
          });
    } else {
      renderScreen(this._view.element);
    }
  }
}
