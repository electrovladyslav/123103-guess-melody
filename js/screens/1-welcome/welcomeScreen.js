import nextScreen from '../2-game-artist/gameArtist';
import renderScreen from '../../functions/renderScreen';
import WelcomeView from './welcomeView';
import initialState from '../../data/initialState';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    this.view.switchToNextScreen = () => {
      renderScreen(nextScreen(initialState));
    };

    renderScreen(this.view.element);
  }
}

export default new WelcomeScreen();
