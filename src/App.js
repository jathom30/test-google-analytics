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
    if (operator === "add") {
      setSolution(firstNumber + secondNumber);
    }
    if (operator === "subtract") {
      setSolution(firstNumber - secondNumber);
    }
    ReactGA.event({
      category: "button press",
      action: "solution",
      label: "math"
    });
  };

  const handleNumber = number => {
    const numArr = [...numbers, number];
    setNumbers(numArr);
    ReactGA.event({
      category: "number press",
      action: "number",
      label: number.toString()
    });
  };

  return (
    <div className="calc">
      <p style={{ minHeight: 18 }}>{numbers.length && numbers}</p>
      <div className="calc-numbers">
        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>
        <button onClick={handleAdd}>+</button>
        <button onClick={() => handleNumber(0)}>0</button>
        <button onClick={handleSubtract}>-</button>
      </div>
      <div className="computation">
        <button onClick={() => setNumbers([])}>clear</button>
        <button onClick={handleSolve}>do math</button>
      </div>
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
      {update && (
        <UpdateComponent setSolution={setSolution} solution={solution} />
      )}
      {solution !== 0 && <Clear solution={solution} clearItUp={clearItUp} />}
    </div>
  );
}

export default App;
