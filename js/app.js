import initialState from './data/initialState';
import switchLevel from './functions/switchLevel';

import WelcomeScreen from './screens/welcomeScreen';
import GameArtistScreen from './screens/gameArtistScreen';
import GameGenreScreen from './screens/gameGenreScreen';
import ResultScreen from './screens/resultScreen';

export default class Application {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    welcomeScreen.init();
  }
  // TODO сделать тот же набор вопросов,
  // TODO при повторном старте, как в тз
  static startGame() {
    const firstScreen = new GameArtistScreen(initialState);
    firstScreen.init();
  }

  static showArtistScreen(state) {
    const screen = new GameArtistScreen(state);
    screen.init();
  }

  static showGenreScreen(state) {
    const screen = new GameGenreScreen(state);
    screen.init();
  }

  static switchLevel(state) {
    switchLevel(state);
  }

  static showResult(state) {
    const screen = new ResultScreen(state);
    screen.init();
  }

}
