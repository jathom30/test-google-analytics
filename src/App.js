import React, { useState } from "react";
import ReactGA from "react-ga";
import "./App.scss";

ReactGA.initialize("UA-120851599-2");
ReactGA.pageview(window.location.pathname + window.location.seach);

const UpdateComponent = ({ addItUp }) => (
  <div>
    <button onClick={() => addItUp([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}>
      do math
    </button>
  </div>
);

const Clear = ({ math, clearItUp }) => (
  <div>
    <p>{math}</p>
    <button onClick={clearItUp}>clear</button>
  </div>
);

function App() {
  const [update, setUpdate] = useState(false);
  const [math, setMath] = useState(0);

  const start = () => {
    setUpdate(true);
    ReactGA.event({
      category: "button press",
      action: "start",
      label: "true"
    });
    ReactGA.modalview("/second");
  };

  const addItUp = arr => {
    const sum = arr.reduce((acc, val) => acc + val);
    setMath(sum);
    ReactGA.event({
      category: "button press",
      action: "math",
      label: sum
    });
    ReactGA.modalview("/show-math");
  };

  const clearItUp = () => {
    setMath(0);
    setUpdate(false);
    ReactGA.event({
      category: "button press",
      action: "clear",
      label: "false"
    });
    ReactGA.modalview("/start");
  };

  return (
    <div className="App">
      <h1>Google Analytics Test</h1>
      <button onClick={start}>click me</button>
      {update && <UpdateComponent addItUp={addItUp} />}
      {math !== 0 && <Clear math={math} clearItUp={clearItUp} />}
    </div>
  );
}

export default App;
