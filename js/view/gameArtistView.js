import GameView from './GameView';
import levelVariant from '../data/levelVariants';

export default class GameArtistView extends GameView {
  constructor(state) {
    super();
    this._state = state;
    this._level = levelVariant.artist;
  }

  get template() {
    const timeMins = Math.floor(this._state.time / 60);
    let timeSecs = this._state.time % 60;
    if (timeSecs < 10) {
      timeSecs = `0` + timeSecs;
    }

    const livesString = new Array(this._state.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``);

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
        <h2 class="title main-title">${this._level.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${this._level.audio.src}"></audio>
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
      <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
      <label class="main-answer" for="answer-${number}"  data-artist="${answer}">
        <img class="main-answer-preview" src="http://placehold.it/134x134"
             alt="${answer}" width="134" height="134">
        ${answer}
      </label>
    </div>
    `;
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
    const triggers = this._element.querySelectorAll(`.main-answer`);
    if (triggers.length) {
      [...triggers].forEach((trigger) => {
        trigger.addEventListener(`click`, (event) => {
          event.preventDefault();
          this.onAnswer(event);
        });
      });
    } else {
      throw new Error(`There is no possible to switch level (no-triggers).`);
    }
  }

  onAnswer() {
  }

}
