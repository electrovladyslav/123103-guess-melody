(function () {
  const template = document.querySelector(`template`);
  const screenNodes = template.content.querySelectorAll(`.main`);
  const screens = [];
  screenNodes.forEach((screen) => {
    screens.push(screen);
  });

  function showScreen(screenNumber) {
    const main = document.querySelector(`.main`);
    if (screens[screenNumber] !== void (0)) {
      main.innerHTML = ``;
      main.appendChild(screens[screenNumber].cloneNode(true));
    }
  }

  let currentScreen = 0;
  showScreen(currentScreen);

  document.addEventListener(`keydown`, (event) => {
    if (event.altKey === true) {
      if (event.key === `ArrowRight`) {
        switchScreen(`next`);
      }
      if (event.key === `ArrowLeft`) {
        switchScreen(`prev`);
      }
    }
  });

  function switchScreen(direction) {
    let nextScreen;
    switch (direction) {
      case `next` :
        nextScreen = ++currentScreen;
        if (nextScreen < screens.length) {
          showScreen(nextScreen);
        } else {
          --currentScreen;
        }
        break;
      case `prev` :
        nextScreen = --currentScreen;
        if (nextScreen >= 0) {
          showScreen(nextScreen);
        } else {
          ++currentScreen;
        }
        break;
    }
  }
})();
