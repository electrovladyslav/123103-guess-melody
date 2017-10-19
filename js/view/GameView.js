import AbstractView from './AbstractView';

export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  bind() {
    this.timeElementMins = this._element.querySelector(`.timer-value-mins`);
    this.timeElementSecs = this._element.querySelector(`.timer-value-secs`);
  }

  updateTime(time) {
    const timeMins = Math.floor(time / 60);
    let timeSecs = time % 60;
    if (timeSecs < 10) {
      timeSecs = `0` + timeSecs;
    }
    this.timeElementMins.textContent = timeMins;
    this.timeElementSecs.textContent = timeSecs;

    if (time === 30) {
      this.timeElementMins.parentNode.classList.add(`timer-value--finished`);
    }
  }
}
