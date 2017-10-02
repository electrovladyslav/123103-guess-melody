/**
 * Clear element .main on page and render input elements inside
 *
 * @param {Node} element DOM node to render
 */
const showScreen = (element) => {
  const container = document.querySelector(`.main`);
  container.innerHTML = ``;
  if (element !== void (0)) {
    container.appendChild(element);
  } else {
    throw new RangeError(`There no input element (no-element).`);
  }
};

export default showScreen;
