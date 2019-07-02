import React, { useState, useEffect } from "react";
import { initializeReactGA } from "./Auth";
import "./App.scss";

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

  useEffect(() => {
    initializeReactGA();
  }, []);

  const addItUp = arr => {
    setMath(arr.reduce((acc, val) => acc + val));
  };

  const clearItUp = () => {
    setMath(0);
    setUpdate(false);
  };

  return (
    <div className="App">
      <button onClick={() => setUpdate(!update)}>click me</button>
      {update && <UpdateComponent addItUp={addItUp} />}
      {math !== 0 && <Clear math={math} clearItUp={clearItUp} />}
    </div>
  );
}

export default App;
