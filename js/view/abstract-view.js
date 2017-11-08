export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view!`);
  }

  get element() {
    if ((!this._element) || (!this._element.firstElementChild)) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    const domTemplate = document.createElement(`template`);
    domTemplate.innerHTML = this.template;
    return domTemplate.content;
  }

  bind() {
  }
}
