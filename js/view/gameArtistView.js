import GameView from './gameView';
import {LIVES_AMOUNT} from '../data/constants';

export default class GameArtistView extends GameView {
  constructor(state) {
    super(state);
  }

  get template() {
    const timeMins = Math.floor(this._state.time / 60);
    let timeSecs = this._state.time % 60;
    if (timeSecs < 10) {
      timeSecs = `0` + timeSecs;
    }

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
          <span class="timer-value-mins">${timeMins}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${timeSecs}</span>
        </div>
      </svg>
      
      <div class="main-mistakes">
         ${livesString}
      </div>
  
      <div class="main-wrap">
        <h2 class="title main-title">${this._level.question}</h2>
        
        <div class="player-wrapper">
          <div class="player">
            <audio src="${this._level.src}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        
        <form class="main-list">`;

    const answersList = this._level.answers.map((answer, number) => {
      return `
      <div class="main-answer-wrapper">
        <input class="main-answer-r"
         type="radio"
         id="answer-${number}"
         name="answer"
         value="val-${number}"/>
        
        <label class="main-answer"
         for="answer-${number}"
         data-artist="${answer.title}">
          <img class="main-answer-preview"
           src="${answer.image.url}"
           alt="${answer.title}"
           width="${answer.image.width}"
           height="${answer.image.height}">
          ${answer.title}
        </label>
      </div>`;
    }).join(``);

    stringTemplate += answersList;

    stringTemplate += `
        </form>
      </div>
    </section>
  `;
    return stringTemplate;
  }

  bind() {
    super.bind();
    this.storeRightAnswer();
    const triggers = this._element.querySelectorAll(`.main-answer`);
    if (triggers.length) {
      Array.from(triggers).forEach((trigger) => {
        trigger.addEventListener(`click`, (event) => {
          event.preventDefault();
          this.onAnswer(event.currentTarget.dataset.artist);
        });
      });
    } else {
      throw new Error(`There is no possible to switch level (no-triggers).`);
    }
  }

  storeRightAnswer() {
    for (const answer of this._level.answers) {
      if (answer.isCorrect) {
        this._level.rightAnswer = answer.title;
        break;
      }
    }
  }

  onAnswer() {
  }

}
