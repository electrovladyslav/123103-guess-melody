import renderScreen from '../functions/renderScreen';
import findAllAudioSrc from '../functions/findAllAudioSrc';
import {preloadResourses} from '../functions/serverCommunicationFunctions';
import app from '../app';
import WelcomeView from '../view/welcomeView';

class WelcomeScreen {
  constructor(state) {
    this._view = new WelcomeView();
    this._levelsSet = state.levelsSet;
  }

  init() {
    this._view.switchToNextScreen = () => {
      app.startGame();
    };

    renderScreen(this._view.element);
    let sources = findAllAudioSrc(this._levelsSet);

    this._view.lockStart();

    Promise.all(sources.map(preloadResourses))
        .then(() => {
          this._view.unlockStart();
        }, (err) => {
          window.console.log(err);
        });
  }
}

export default WelcomeScreen;
