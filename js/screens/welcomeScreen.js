import renderScreen from '../functions/renderScreen';
import findAllAudioSrc from '../functions/findAllAudioSrc';
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

    this._view.lockStart();
    const sources = findAllAudioSrc(this._levelsSet);

    const loadResouce = (resource) => {
      const promise = new Promise((resolve) => {
        const audio = document.createElement(`audio`);
        audio.src = resource;

        audio.addEventListener(`canplay`, resolve);
      });

      return promise;
    };

    Promise.all(sources.map(loadResouce))
        .then(() => {
          this._view.unlockStart();
        }, (err) => {
          window.console.log(err);
        });
  }
}

export default WelcomeScreen;
