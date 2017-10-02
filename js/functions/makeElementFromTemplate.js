/**
 * Make DOM-element from string-template
 * @param {string} stringTemplate string with HTML template
 * @return {Node} DOM element
 */
const makeElementFromTemplate = (stringTemplate) => {
  const template = document.createElement(`template`);
  template.innerHTML = stringTemplate;
  return template.content;
};

export default makeElementFromTemplate;
