import nextScreen from '../2-game-artist/gameArtistScreen.js';
import renderScreen from '../../functions/renderScreen';
import WelcomeView from './welcomeView';
import initialState from '../../data/initialState';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    this.view.switchToNextScreen = () => {
      const next = new nextScreen(initialState);
      next.init();
    };

    renderScreen(this.view.element);
  }
}

export default new WelcomeScreen();
