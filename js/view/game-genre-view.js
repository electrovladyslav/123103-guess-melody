import GameView from './game-view';

export default class GameGenreView extends GameView {
  constructor(state) {
    super(state);
  }

  get template() {
    let stringTemplate = `${this.headerString}
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
    const auxTriggers = Array.from(this._element.querySelectorAll(`input[name="answer"]`));
    this._auxTriggersStore = new Set();

    const changeMainTrigger = () => {
      let checkedFlag = false;
      auxTriggers.forEach((trigger) => {
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
      auxTriggers.forEach((trigger) => {
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
