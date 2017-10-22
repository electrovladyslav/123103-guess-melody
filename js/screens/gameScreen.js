import decreaseLife from '../functions/decreaseLife';
import switchLevel from '../functions/switchLevel';
import getRandomArrElem from '../functions/getRandomArrElem';
import updateTimeInState from '../functions/updateTimeInState';
import timer from '../functions/timer';
import renderScreen from '../functions/renderScreen';
import artistScreen from './2-game-artist/gameArtistScreen';
import genreScreen from './3-game-genre/gameGenreScreen';
import resultScreen from './4-result/result';


class GameGenreScreen {
  constructor(state) {
    this._state = state;
  }

  init() {
    this._timerId = timer(
        this._state.time, (time) => {
          this._view.updateTimeOnScreen(time);
          this._state = updateTimeInState(this._state, time);
        }, () => {
          switchLevel(this._state);
        }
    );
  }

}

export default GameGenreScreen;
