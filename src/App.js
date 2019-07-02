import React, { useState } from "react";
import ReactGA from "react-ga";
import "./App.scss";

ReactGA.initialize("UA-120851599-2", {
  debug: true
});

const UpdateComponent = ({ setSolution }) => {
  const [numbers, setNumbers] = useState([]);
  const [firstNumber, setFirstNumber] = useState(0);
  const [operator, setOperator] = useState("");

  const handleAdd = () => {
    setFirstNumber(parseInt(numbers.join("")));
    setNumbers([]);
    setOperator("add");
    ReactGA.event({
      category: "button press",
      action: "addition",
      label: "math"
    });
  };
  const handleSubtract = () => {
    setFirstNumber(parseInt(numbers.join("")));
    setNumbers([]);
    setOperator("subtract");
    ReactGA.event({
      category: "button press",
      action: "subtraction",
      label: "math"
    });
  };
  const handleSolve = () => {
    const secondNumber = parseInt(numbers.join(""));
    if (operator === "add") setSolution(firstNumber + secondNumber);
    if (operator === "subtract") setSolution(firstNumber - secondNumber);
    ReactGA.event({
      category: "button press",
      action: "solution",
      label: "math"
    });
  };

  return (
    <div className="calc">
      <p style={{ minHeight: 18 }}>{numbers.length && numbers}</p>
      <div className="calc-numbers">
        <button onClick={() => setNumbers([...numbers, 1])}>1</button>
        <button onClick={() => setNumbers([...numbers, 2])}>2</button>
        <button onClick={() => setNumbers([...numbers, 3])}>3</button>
        <button onClick={() => setNumbers([...numbers, 4])}>4</button>
        <button onClick={() => setNumbers([...numbers, 5])}>5</button>
        <button onClick={() => setNumbers([...numbers, 6])}>6</button>
        <button onClick={() => setNumbers([...numbers, 7])}>7</button>
        <button onClick={() => setNumbers([...numbers, 8])}>8</button>
        <button onClick={() => setNumbers([...numbers, 9])}>9</button>
      </div>
      <div className="computation">
        <button onClick={handleAdd}>+</button>
        <button onClick={() => setNumbers([])}>clear</button>
        <button onClick={handleSubtract}>-</button>
      </div>
      <button onClick={handleSolve}>do math</button>
    </div>
  );
};

const Clear = ({ solution, clearItUp }) => {
  ReactGA.modalview("show-math");
  return (
    <div>
      <p>{solution}</p>
      <button onClick={clearItUp}>clear</button>
    </div>
  );
};

function App() {
  const [update, setUpdate] = useState(false);
  const [solution, setSolution] = useState(0);

  const start = () => {
    setUpdate(true);
    ReactGA.event({
      category: "button press",
      action: "start",
      label: "true"
    });
  };

  const clearItUp = () => {
    setSolution(0);
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
      {!update && <button onClick={start}>click me</button>}
      {update && <UpdateComponent setSolution={setSolution} />}
      {solution !== 0 && <Clear solution={solution} clearItUp={clearItUp} />}
    </div>
  );
}

export default App;
