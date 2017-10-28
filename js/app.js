import initialState from './data/initialState';
import controllerID from './data/controllerID';
import encodeState from './functions/encodeState';
import decodeState from './functions/decodeState';
import Loader from './loader';

import WelcomeScreen from './screens/welcomeScreen';
import GameScreen from './screens/gameScreen';
import ResultScreen from './screens/resultScreen';


class Application {
  static init(levelsSet) {
    this.levelsSet = levelsSet;
    this.routes = {
      [controllerID.WELCOME]: WelcomeScreen,
      [controllerID.GAME]: GameScreen,
      [controllerID.RESULT]: ResultScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const Controller = this.routes[id];
    let state;
    if (data !== void 0) {
      state = decodeState(data);
    } else {
      state = initialState;
    }
    state = Object.assign({}, state, {
      levelsSet: this.levelsSet
    });
    if (Controller) {
      const controller = new Controller(state);
      controller.init();
    }
  }

  static showWelcome() {
    location.hash = controllerID.WELCOME;
  }

  static startGame() {
    location.hash = controllerID.GAME;
  }

  static showNextScreen(state) {
    location.hash = controllerID.GAME + `?` + encodeState(state);
  }

  static showResult(state) {
    location.hash = controllerID.RESULT + `?` + encodeState(state);
  }
}

Loader.loadData().
    then((levelsSet) => Application.init(levelsSet));
export default Application;
