/**
 * Make DOM-element from string-template
 * @param {string} stingTemplate string with HTML template
 * @return {Node} DOM element
 */
const makeElementFromTemplate = (stingTemplate) => {
  const template = document.createElement(`template`);
  template.innerHTML = stingTemplate;
  return template.content;
};

export default makeElementFromTemplate;
