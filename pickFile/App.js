import React from "react";
function App() {
  const pickfile = React.useRef();
  function handlePick() {
    pickfile.current.click();
  }
  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input
          data-testid="file-picker"
          type="file"
          accept="image/*"
          ref={pickfile}
        />
        <button onClick={handlePick}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;
