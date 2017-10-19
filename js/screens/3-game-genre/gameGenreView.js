import GameView from '../../view/GameView';
import levelVariant from '../../data/levelVariants';

export default class GameGenreView extends GameView {
  constructor(state) {
    super(state);
    this._level = levelVariant.genre;
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
        <h2 class="title">${this._level.title}</h2>
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
        <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}" data-artist="${answer.artist}">
        <label class="genre-answer-check" for="a-${number}" data-artist="${answer.artist}"></label>
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
    const mainTrigger = this._element.querySelector(`.genre-answer-send`);
    const auxTriggers = this._element.querySelectorAll(`input[name="answer"]`);
    this._auxTriggersStore = new Set();

    const onChoose = (event) => {
      if (this._auxTriggersStore.has(event.target.dataset.artist)) {
        this._auxTriggersStore.delete(event.target.dataset.artist);
      } else {
        this._auxTriggersStore.add(event.target.dataset.artist);
      }
      mainTrigger.disabled = !this._auxTriggersStore.size;
    };

    if (auxTriggers.length) {
      [...auxTriggers].forEach((trigger) => {
        trigger.addEventListener(`change`, (event) => {
          onChoose(event);
        });
      });
    } else {
      throw new Error(`There is no possible to switch level (no-triggers).`);
    }

    mainTrigger.addEventListener(`click`, () => {
      event.preventDefault();
      this.onAnswer(event);
    });
  }


  onAnswer() {
  }

}
