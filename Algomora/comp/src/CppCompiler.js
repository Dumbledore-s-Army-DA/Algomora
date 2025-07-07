import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike";

const CppCompiler = () => {
  const [code, setCode] = useState(`#include<iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`);
  const [output, setOutput] = useState("");

  const handleCompile = async () => {
    try {
      const res = await axios.post("http://localhost:5000/compile", { code });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error connecting to compiler backend.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>C++ Online Compiler (React)</h2>
      <CodeMirror
        value={code}
        options={{
          mode: "text/x-c++src",
          theme: "material",
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <button onClick={handleCompile} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Compile & Run
      </button>
      <div style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CppCompiler;
