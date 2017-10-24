export default (codeStr) => {
  const DIVIDER = `&`;
  const decodeMap = [`wrong`, `correct`, `fast`];
  const state = {};
  const params = codeStr.split(DIVIDER);
  state.time = Number(params.shift());
  state.lives = Number(params.shift());
  state.currentLevel = Number(params.shift());
  state.answers = [];
  const codeAnswers = params[0].split(``);
  codeAnswers.forEach((answer) => {
    if (decodeMap[answer] !== void 0) {
      state.answers.push(decodeMap[answer]);
    } else {
      throw new Error(`Wrong input data!`);
    }
  });
  return state;
};
