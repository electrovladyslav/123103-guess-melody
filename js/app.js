import initialState from './data/initialState';
import controllerID from './data/controllerID';
import switchLevel from './functions/switchLevel';
import replaceHashSymbol from './functions/replaceHashSymbol';

import WelcomeScreen from './screens/welcomeScreen';
import GameArtistScreen from './screens/gameArtistScreen';
import GameGenreScreen from './screens/gameGenreScreen';
import ResultScreen from './screens/resultScreen';

class Application {
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
    const controller = new Controller(this.state = initialState);
    controller.init();
  }

  init() {
    this.changeController(replaceHashSymbol(location.hash));
  }

  showWelcome() {
    location.hash = controllerID.WELCOME;
  }


  startGame() {
    location.hash = controllerID.GAME;
  }

  showArtistScreen(state) {
    this.state = state;
    const screen = new GameArtistScreen(state);
    screen.init();
  }

  showGenreScreen(state) {
    this.state = state;
    const screen = new GameGenreScreen(state);
    screen.init();
  }

  switchLevel(state) {
    this.state = state;
    switchLevel(state); //вот тут контекст теряется
  }

  showResult(state) {
    this.state = state;
    location.hash = controllerID.RESULT;
  }

}

export default new Application();
