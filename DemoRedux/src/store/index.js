import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import counterSlice from "../store/counter";
import authSlice from "../store/auth";
const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export default store;
// const counterReducer = (state = { counter: 0 }, action) => {
//   if (action.type === "increment") {
//     const dynamicAction = action.value ? action.value : 1;
//     return {
//       counter: state.counter + dynamicAction,
//       showCounter: state.showCounter,
//     };
//   }
//   if (action.type === "decrement") {
//     const dynamicAction = action.value ? action.value : 1;
//     return {
//       counter: state.counter - dynamicAction,
//       showCounter: state.showCounter,
//     };
//   }
//   if (action.type === "toggle") {
//     return {
//       showCounter: !state.showCounter,
//       counter: state.counter,
//     };
//   }
//   return state;
// };
// const store = createStore(counterReducer);
