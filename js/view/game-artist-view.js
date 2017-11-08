import GameView from './game-view';


export default class GameArtistView extends GameView {
  constructor(state) {
    super(state);
  }

  get template() {
    let stringTemplate = `${this.headerString}
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
