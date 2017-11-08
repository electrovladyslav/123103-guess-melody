import AbstractView from './abstract-view';
import outputResult from '../functions/output-result';
import {LIVES_AMOUNT} from '../data/constants';

export default class ResultView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get title() {
    if (this._state.lives === 0) {
      return `Увы и ах!`;
    }
    if (this._state.time <= 0) {
      return `Какая жалость!`;
    }
    this.win = true;
    return `Вы настоящий меломан!`;
  }

  get template() {
    let fastAnswers = 0;
    this._state.answers.forEach((answer) => {
      if (answer === `fast`) {
        fastAnswers++;
      }
    });
    this._state = Object.assign({}, this._state, {
      points: this.points
    });
    const resultPhrase = outputResult(this.otherResultsPoints, this._state);

    const timeMins = Math.floor(this._state.time / 60);
    let timeSecs = this._state.time % 60;

    let outputString = `
      <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this.title}</h2>
      <div class="main-stat">
    `;
    if (this.win) {
      outputString += `
      За&nbsp;${timeMins}&nbsp;минуты и ${timeSecs}&nbsp;секунд
        <br>вы&nbsp;набрали ${this.points} баллов (${fastAnswers} быстрых)
        <br>совершив ${LIVES_AMOUNT - this._state.lives} ошибки</div>
      <span class="main-comparison">${resultPhrase}</span>
      `;
    } else {
      outputString += `${resultPhrase}</div>`;
    }

    outputString += `
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>
    `;

    return outputString;
  }

  bind() {
    const trigger = this._element.querySelector(`.main-replay`);
    if (trigger) {
      trigger.addEventListener(`click`, this.switchToNextScreen);
    } else {
      throw new Error(`There is no possible to switch level (no-triggers).`);
    }
  }

  switchToNextScreen() {

  }

  /**
   * Get array of points from object of other results
   * @return {Array}
   */
  get otherResultsPoints() {
    const arrOfOtherResults = [];
    if ((this.otherResults !== void 0)
        && (this.otherResults.length > 0)) {

      this.otherResults.forEach((result) => {
        if (result.points !== void 0) {
          arrOfOtherResults.push(result.points);
        }
      });
    }
    return arrOfOtherResults;
  }
}
