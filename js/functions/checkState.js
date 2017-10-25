export default (state)=> {
  if ((state === void 0)
    || (state.time === void 0)
    || (state.lives === void 0)
    || (state.currentLevel === void 0)
    || (state.answers === void 0)) {
    throw new Error(`Wrong input data (some states param is missing)!`);
  }
};
