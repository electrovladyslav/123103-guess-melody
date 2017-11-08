import {renderScreen} from '../data/utuls';
import calcPoints from '../functions/calc-points';
import {loadResults, saveResults} from '../functions/server-communication-functions';

import {OTHER_RESULTS_MOCK} from '../data/constants';

import ResultView from '../view/result-view';
import app from '../app';

export default class {
  constructor(state) {
    this._view = new ResultView(state);
    this._state = state;
  }

  init() {
    this._view.switchToNextScreen = () => {
      app.startGame();
    };

    if ((this._state.lives > 0) && (this._state.time > 0)) {

      this._view.points = calcPoints(this._state.answers, this._state.lives);

      loadResults({})
          .then((results) => {
            this._view.otherResults = results;
          }).catch(() => {
            window.console.log(`No possible to load statistics of other games. Mock statistic used.`);
            this._view.otherResults = OTHER_RESULTS_MOCK;
          })

          .then(() => {
            renderScreen(this._view.element);

            return saveResults({
              data: {
                time: this._state.time,
                points: this._view.points
              }
            });
          }).catch(() => {
            window.console.log(`No possible to save statistics of your game.`);
          });

    } else {
      renderScreen(this._view.element);
    }
  }
}
