import AbstractView from './AbstractView';
import calcPoints from '../functions/calcPoints';
import outputResult from '../functions/outputResult';
import OTHER_RESULTS_MOCK from '../data/otherResultsMock';

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
    return `Вы настоящий меломан!`;
  }

  get template() {
    const points = calcPoints(this._state.answers, this._state.lives);
    let fastAnswers = 0;
    this._state.answers.forEach((answer) => {
      if (answer === `fast`) {
        fastAnswers++;
      }
    });
    const newState = Object.assign({}, this._state, {
      points
    });
    const resultPhrase = outputResult(OTHER_RESULTS_MOCK, newState);
    const timeMins = Math.floor(this._state.time / 60);
    let timeSecs = this._state.time % 60;

    let outputString = `
      <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this.title}</h2>
      <div class="main-stat">
    `;
    if (points !== -1) {
      outputString += `
      За&nbsp;${timeMins}&nbsp;минуты и ${timeSecs}&nbsp;секунд
        <br>вы&nbsp;набрали ${points} баллов (${fastAnswers} быстрых)
        <br>совершив ${3 - this._state.lives} ошибки</div>
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
}
