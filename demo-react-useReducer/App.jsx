import React from "react";
export function counterReducer(state, action) {
  if (action.type === "INCREMENT") {
    return {
      ...state,
      count: state.count + 1,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      ...state,
      count: state.count - 1,
    };
  }
  if (action.type === "RESET") {
    return {
      ...state,
      count: +0,
    };
  }
  return state;
}

function App() {
  const [counterState, counterStateDispacht] = React.useReducer(
    counterReducer,
    {
      count: +0,
    }
  );
  function handleIncrement() {
    counterStateDispacht({
      type: "INCREMENT",
    });
  }
  function handleDecrement() {
    counterStateDispacht({
      type: "DECREMENT",
    });
  }
  function handleReset() {
    counterStateDispacht({
      type: "RESET",
    });
  }
  return (
    <div id="app">
      <h1>The (Final?) Counter</h1>
      <p id="actions">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleReset}>Reset</button>
      </p>
      <p id="counter">{counterState.count}</p>
    </div>
  );
}

export default App;
