import { createStore } from "redux";
const counterReducer = (state = { counter: 0, value: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + state.value,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - state.value,
    };
  }
  return state;
};
const store = createStore(counterReducer);

export default store;
