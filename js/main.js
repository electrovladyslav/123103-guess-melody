function getScreens() {
  const template = document.querySelector(`template`);
  const arr = [];
  template.content.querySelectorAll(`.main`).forEach( (item) => {
    arr.push(item);
  });
  return arr;
}

const screens = getScreens();

function showScreen(screenNumber) {
  const main = document.querySelector(`.main`);
  main.innerHTML = ``;
  if (screens[screenNumber] !== undefined) {
    main.appendChild(screens[screenNumber].cloneNode(true));
   }
}

showScreen(0);
