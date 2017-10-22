import AbstractView from '../../view/AbstractView';
import initialState from '../../data/initialState';

export default class WelcomeView extends AbstractView {
  get template() {
    return `
      <section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${initialState.time / 60} минут ответить на все вопросы.<br>
    Ошибиться можно ${initialState.lives} раза.<br>
    Удачи!
    </p>
    </section>
    `;
  }

  bind() {
    const trigger = this._element.querySelector(`.main-play`);
    if (trigger) {
      trigger.addEventListener(`click`, this.switchToNextScreen);
    } else {
      throw new Error(`There is no possible to switch level (no-triggers).`);
    }
  }

  switchToNextScreen() {

  }
}
