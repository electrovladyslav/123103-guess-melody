import makeElementFromTemplate from '../functions/makeElementFromTemplate';

export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view!`);
  }

  render() {
    return makeElementFromTemplate(this.template);
  }

  bind() {

  }

  get element() {
    if ((!this._element) || (!this._element.firstElementChild)) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
