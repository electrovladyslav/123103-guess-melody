export default (codeStr) => {
  const DIVIDER = `&`;
  const decodeMap = [`wrong`, `correct`, `fast`];
  const state = {};
  const params = codeStr.split(DIVIDER);

  params.forEach((param) => {
    const val = param.split(`=`);
    state[val[0]] = Number(val[1]);
  });

  const indexOfAnswer = codeStr.indexOf(`answers`);
  const indexOfNextAmp = codeStr.indexOf(`&`, indexOfAnswer);
  let strAnswers;
  if (indexOfNextAmp !== -1) {
    strAnswers = codeStr.slice((indexOfAnswer + 8), indexOfNextAmp);
  } else {
    strAnswers = codeStr.slice((indexOfAnswer + 8));
  }
  const codeAnswers = strAnswers.split(``);
  state.answers = [];
  codeAnswers.forEach((answer) => {
    if (decodeMap[answer] !== void 0) {
      state.answers.push(decodeMap[answer]);
    } else {
      throw new Error(`Wrong input data!`);
    }
  });
  return state;
};
