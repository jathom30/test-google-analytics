import React, { useState } from "react";
import { initializeReactGA } from "./Auth";
import ReactGA from "react-ga";
import "./App.scss";

ReactGA.initialize("UA-120851599-2");

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
      action: "start"
    });
  };

  const addItUp = arr => {
    const sum = arr.reduce((acc, val) => acc + val);
    setMath(sum);
    ReactGA.event({
      category: "button press",
      action: "math",
      sum: sum
    });
  };

  const clearItUp = () => {
    setMath(0);
    setUpdate(false);
    ReactGA.event({
      category: "button press",
      action: "clear",
      label: "reset"
    });
  };

  return (
    <div className="App">
      <button onClick={start}>click me</button>
      {update && <UpdateComponent addItUp={addItUp} />}
      {math !== 0 && <Clear math={math} clearItUp={clearItUp} />}
    </div>
  );
}

export default App;
