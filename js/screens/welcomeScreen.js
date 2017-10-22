import renderScreen from '../functions/renderScreen';
import app from '../app';
import WelcomeView from '../view/welcomeView';

class WelcomeScreen {
  constructor() {
    this._view = new WelcomeView();
  }

  init() {
    this._view.switchToNextScreen = () => {
      app.startGame();
    };

    renderScreen(this._view.element);
  }
}

export default new WelcomeScreen();
