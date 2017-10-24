import initialState from './data/initialState';
import controllerID from './data/controllerID';
import switchLevel from './functions/switchLevel';
import replaceHashSymbol from './functions/replaceHashSymbol';

import WelcomeScreen from './screens/welcomeScreen';
import GameArtistScreen from './screens/gameArtistScreen';
import GameGenreScreen from './screens/gameGenreScreen';
import ResultScreen from './screens/resultScreen';

export default class Application {
  constructor() {
    this.routes = {
      [controllerID.WELCOME]: WelcomeScreen,
      [controllerID.GAME]: GameArtistScreen,
      [controllerID.RESULT]: ResultScreen
    };
    window.onhashchange = () => {
      this.changeController(replaceHashSymbol(location.hash));
    };
  }

  changeController(route = ``) {
    const Controller = this.routes[route];
    const controller = new Controller();
    controller.init();
  }

  init() {
    this.changeController(replaceHashSymbol(location.hash));
  }

  static showWelcome() {
    location.hash = controllerID.WELCOME;
    // const welcomeScreen = new WelcomeScreen();
    // welcomeScreen.init();
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
