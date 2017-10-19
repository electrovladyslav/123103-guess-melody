export default (state, time) => {
  state = Object.assign({}, state, {
    time
  });
  return state;
};
