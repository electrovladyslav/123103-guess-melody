import AbstractView from './abstract-view';
import {LIVES_AMOUNT, TIME_AMOUNT} from '../data/constants';

export default class WelcomeView extends AbstractView {
  get template() {
    return `
      <section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${TIME_AMOUNT / 60} минут ответить на все вопросы.<br>
    Ошибиться можно ${LIVES_AMOUNT} раза.<br>
    Удачи!
    </p>
    </section>
    `;
  }

  bind() {
    this._startBtn = this._element.querySelector(`.main-play`);
    if (this._startBtn) {
      this._startBtn.addEventListener(`click`, this.switchToNextScreen);
    } else {
      throw new Error(`There is no possible to switch level (no-triggers).`);
    }
  }

  switchToNextScreen() {

  }

  lockStart() {
    this._startBtn.disabled = true;
  }

  unlockStart() {
    this._startBtn.disabled = false;
  }
}
