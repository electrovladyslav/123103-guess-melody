import AbstractView from '../../view/AbstractView';
import calcPoints from '../../functions/calcPoints';
import outputResult from '../../functions/outputResult';
import OTHER_RESULTS_MOCK from '../../data/otherResultsMock';

export default class ResultView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get title() {
    switch (this._state.result) {
      case `win`:
        return `Вы настоящий меломан!`;
      case `loose-time`:
        return `Увы и ах!`;
      case `loose-attempt`:
        return `Какая жалость!`;
      default:
        throw new TypeError(`Wrong result type!`);
    }
  }

  get template() {
    const points = calcPoints(this._state.answers, this._state.lives);
    const newState = Object.assign({}, this._state, {
      points
    });
    const resultPhrase = outputResult(OTHER_RESULTS_MOCK, newState);

    let outputString = `
      <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this.title}</h2>
      <div class="main-stat">
    `;
    if (this._state.result === `win`) {
      outputString += `
      За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
        <br>вы&nbsp;набрали ${points} баллов (0 быстрых)
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
