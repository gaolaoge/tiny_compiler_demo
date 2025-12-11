import { useState } from "react";

import { tokenizer } from "./compiler/token";
import { parser } from "./compiler/parser";
import { generator } from "./compiler/generator";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const handleCompile = () => {
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    const code = generator(ast);
    setOutput(code);
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
      <textarea
        id="output"
        placeholder="Output"
        value={output}
        readOnly
      ></textarea>
    </div>
  );
}

export default App;
export { App as TinyCompilerDemo };
