import renderScreen from '../functions/renderScreen';
import ResultView from '../view/resultView';
import app from '../app';

export default class {
  constructor(state) {
    this._view = new ResultView(state);
  }

  init() {
    this._view.switchToNextScreen = () => {
      app.startGame();
    };

    renderScreen(this._view.element);
  }
}
