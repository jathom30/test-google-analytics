import React, { useState } from "react";
import ReactGA from "react-ga";
import "./App.scss";

ReactGA.initialize("UA-120851599-2");

const UpdateComponent = ({ addItUp }) => {
  ReactGA.modalview("second");
  return (
    <div>
      <button onClick={() => addItUp([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}>
        do math
      </button>
    </div>
  );
};

const Clear = ({ math, clearItUp }) => {
  ReactGA.modalview("show-math");
  return (
    <div>
      <p>{math}</p>
      <button onClick={clearItUp}>clear</button>
    </div>
  );
};

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
  };

  const addItUp = arr => {
    const sum = arr.reduce((acc, val) => acc + val);
    setMath(sum);
    ReactGA.event({
      category: "button press",
      action: "math",
      label: sum.toString(),
      value: sum
    });
  };

  const clearItUp = () => {
    setMath(0);
    setUpdate(false);
    ReactGA.event({
      category: "button press",
      action: "clear",
      label: "false"
    });
  };

  ReactGA.pageview("home-page");
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
