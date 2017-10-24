import updateTimeInState from '../functions/updateTimeInState';
import timer from '../functions/timer';
import app from '../app';


class GameScreen {
  constructor(state) {
    this._state = state;
  }

  init() {
    this._timerId = timer(
        this._state.time, (time) => {
          this._view.updateTimeOnScreen(time);
          this._state = updateTimeInState(this._state, time);
        }, () => {
          app.switchLevel(this._state);
        }
    );
  }

}

export default GameScreen;
