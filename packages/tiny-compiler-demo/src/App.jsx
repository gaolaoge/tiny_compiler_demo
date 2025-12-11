import { useState } from "react";

import { Compiler } from "./compiler";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleCompile = () => {
    // const res = Compiler(input);
    setOutput(input);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="app-container">
      <h1>Tiny Compiler Demo</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a mathematical expression"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button onClick={handleCompile}>Compile</button>
      <button onClick={handleReset}>Reset</button>
      {/* <textarea
        id="output"
        placeholder="Output"
        value={output}
        readOnly
      ></textarea> */}
      <Compiler input={output} />
    </div>
  );
}

export default App;
export { App as TinyCompilerDemo };
