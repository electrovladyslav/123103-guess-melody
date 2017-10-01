/**
 * Make DOM-element from string-template
 * @param {string} tmplString string with HTML template
 * @return {Node} DOM element
 */
const makeElementFromTemplate = (tmplString) => {
  const template = document.createElement(`template`);
  template.innerHTML = tmplString;
  return template.content;
};

export default makeElementFromTemplate;
