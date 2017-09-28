(function () {
  function getScreens() {
    const template = document.querySelector(`template`);
    const arr = [];
    template.content.querySelectorAll(`.main`).forEach((item) => {
      arr.push(item);
    });
    return arr;
  }

  const screens = getScreens();

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
    switch (direction) {
      case `next` :
        if ((currentScreen + 1) < screens.length) {
          showScreen(++currentScreen);
        }
        break;
      case `prev` :
        if ((currentScreen - 1) >= 0) {
          showScreen(--currentScreen);
        }
        break;
    }
  }
})();
