import AbstractView from './AbstractView';

export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
    this._level = state.levelsSet[state.currentLevel];
  }

  bind() {
    this.timeElementMins = this._element.querySelector(`.timer-value-mins`);
    this.timeElementSecs = this._element.querySelector(`.timer-value-secs`);
    this.addPlayLogic();
  }

  addPlayLogic() {
    const playButtons = this._element.querySelectorAll(`.player-control`);
    this.playingNow = null;
    [...playButtons].forEach((button) => {
      button.addEventListener(`click`, (event) => {
        event.preventDefault();
        this.playPause(event.target);
      });
    });
  }

  playPause(element) {
    if (element.classList.contains(`player-control--pause`)) {
      if (this.playingNow) {
        this.playingNow.pause();
      }
      element.previousElementSibling.play();
      this.playingNow = element.previousElementSibling;
      element.classList.remove(`player-control--pause`);
      element.classList.add(`player-control--play`);
    } else {
      element.previousElementSibling.pause();
      this.playingNow = null;
      element.classList.remove(`player-control--play`);
      element.classList.add(`player-control--pause`);
    }
  }

  updateTimeOnScreen(time) {
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
