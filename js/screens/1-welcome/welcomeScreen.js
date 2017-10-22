import nextScreen from '../2-game-artist/gameArtistScreen.js';
import renderScreen from '../../functions/renderScreen';
import app from '../../app';
import WelcomeView from './welcomeView';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    this.view.switchToNextScreen = () => {
      app.startGame();
    };

    renderScreen(this.view.element);
  }
}

export default new WelcomeScreen();
