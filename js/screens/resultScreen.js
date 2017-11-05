import {renderScreen} from '../data/utuls';
import calcPoints from '../functions/calcPoints';
import {loadResults, saveResults} from '../functions/serverCommunicationFunctions';

import {OTHER_RESULTS_MOCK} from '../data/constants';

import ResultView from '../view/resultView';
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
          }, (err) => {
            window.console.log(err);
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
          }, (err) => {
            window.console.log(err);
          });

    } else {
      renderScreen(this._view.element);
    }
  }
}
