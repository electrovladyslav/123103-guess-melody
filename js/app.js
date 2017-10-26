import initialState from './data/initialState';
import controllerID from './data/controllerID';
import switchLevel from './functions/switchLevel';
import encodeState from './functions/encodeState';
import decodeState from './functions/decodeState';

import WelcomeScreen from './screens/welcomeScreen';
import GameArtistScreen from './screens/gameArtistScreen';
import GameGenreScreen from './screens/gameGenreScreen';
import ResultScreen from './screens/resultScreen';

const routes = {
  [controllerID.WELCOME]: WelcomeScreen,
  [controllerID.GAME_ARTIST]: GameArtistScreen,
  [controllerID.GAME_GENRE]: GameGenreScreen,
  [controllerID.RESULT]: ResultScreen
};

class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const Controller = routes[id];
    let state;
    if (data !== void 0) {
      state = decodeState(data);
    } else {
      state = initialState;
    }
    if (Controller) {
      const controller = new Controller(state);
      controller.init();
    }
  }

  static showWelcome() {
    location.hash = controllerID.WELCOME;
  }


  static startGame() {
    location.hash = controllerID.GAME_ARTIST;
  }

  static showArtistScreen(state) {
    location.hash = controllerID.GAME_ARTIST + `?` + encodeState(state);
  }

  static showGenreScreen(state) {
    location.hash = controllerID.GAME_GENRE + `?` + encodeState(state);
  }

  static switchLevel(state) {
    switchLevel(state);
  }

  static showResult(state) {
    location.hash = controllerID.RESULT + `?` + encodeState(state);
  }

}
Application.init();
export default Application;
