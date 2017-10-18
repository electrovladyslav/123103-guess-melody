export default (state) => {
  state = Object.assign({}, state);
  state.time--;
  return state;
};
