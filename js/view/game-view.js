import AbstractView from './abstract-view';
import {FAST_TIME, LIVES_AMOUNT} from '../data/constants';
import {convertTime} from '../data/utuls';

export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
    this._level = state.levelsSet[state.currentLevel];
  }

  get headerString() {
    const timeToScreen = convertTime(this._state.time);

    let livesString = ``;
    if (LIVES_AMOUNT > this._state.lives) {
      livesString += new Array(LIVES_AMOUNT - this._state.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``);
    }

    let stringTemplate = `
    <section class="main main--level main--level-artist">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${timeToScreen.mins}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${timeToScreen.secs}</span>
        </div>
      </svg>
      
      <div class="main-mistakes">
         ${livesString}
      </div>
  
      <div class="main-wrap">
        <h2 class="title main-title">${this._level.question}</h2>`;

    return stringTemplate;
  }

  bind() {
    this.timeElementMins = this._element.querySelector(`.timer-value-mins`);
    this.timeElementSecs = this._element.querySelector(`.timer-value-secs`);
    this.addPlayLogic();
  }

  addPlayLogic() {
    const playButtons = this._element.querySelectorAll(`.player-control`);
    this.playingNow = null;
    Array.from(playButtons).forEach((button) => {
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
        this.playingNow.nextElementSibling.classList.remove(`player-control--play`);
        this.playingNow.nextElementSibling.classList.add(`player-control--pause`);
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
    const timeToScreen = convertTime(time);
    this.timeElementMins.textContent = timeToScreen.mins;
    this.timeElementSecs.textContent = timeToScreen.secs;

    if (time === FAST_TIME) {
      this.timeElementMins.parentNode.classList.add(`timer-value--finished`);
    }
  }
}
