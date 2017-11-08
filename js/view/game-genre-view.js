import GameView from './game-view';
import {LIVES_AMOUNT} from '../data/constants';

export default class GameGenreView extends GameView {
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
        <h2 class="title">${this._level.question}</h2>
        <form class="genre">`;

    const answersList = this._level.answers.map((answer, number) => {
      return `
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${answer.src}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}" data-genre="${answer.genre}">
        <label class="genre-answer-check" for="a-${number}" data-genre="${answer.genre}"></label>
      </div>
    `;
    }).join(``);

    stringTemplate += answersList;
    stringTemplate += `
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>
  `;

    return stringTemplate;
  }

  bind() {
    super.bind();
    this.storeRightAnswer();
    const mainTrigger = this._element.querySelector(`.genre-answer-send`);
    const auxTriggers = this._element.querySelectorAll(`input[name="answer"]`);
    this._auxTriggersStore = new Set();

    const changeMainTrigger = () => {
      let checkedFlag = false;
      Array.from(auxTriggers).forEach((trigger) => {
        if (trigger.checked) {
          checkedFlag = true;
        }
      });
      mainTrigger.disabled = !checkedFlag;
    };

    const onChoose = (event) => {
      if (this._auxTriggersStore.has(event.target)) {
        this._auxTriggersStore.delete(event.target);
      } else {
        this._auxTriggersStore.add(event.target);
      }
      this._auxTriggersStore.add(event.target);
      changeMainTrigger();
    };

    if (auxTriggers.length) {
      Array.from(auxTriggers).forEach((trigger) => {
        trigger.addEventListener(`change`, (event) => {
          onChoose(event);
        });
      });
    } else {
      throw new Error(`There is no possible to switch level (no-triggers).`);
    }

    mainTrigger.addEventListener(`click`, () => {
      event.preventDefault();
      this.onAnswer(this.getDatasets(Array.from(this._auxTriggersStore)));
    });
  }

  getDatasets(elements) {
    return elements.map((element) => element.dataset.genre);
  }

  storeRightAnswer() {
    this._level.rightAnswer = this._level.genre;
  }

  onAnswer() {
  }

}
