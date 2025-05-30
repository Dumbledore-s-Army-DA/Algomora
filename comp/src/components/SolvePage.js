import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../api/api';
import axios from 'axios';
import '../components/solve.css';
import SplitPane from 'react-split-pane';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { go } from '@codemirror/lang-go';
import { dracula } from '@uiw/codemirror-theme-dracula';



const SolvePage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [showManualTest, setShowManualTest] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [manualExpectedOutput, setManualExpectedOutput] = useState('');
  const [manualTestCases, setManualTestCases] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getQuestionById(id);
        setQuestion(res.data);
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Error fetching question. Please try again later.");
      }
    };
    fetchQuestion();
  }, [id]);

  const handleAddManualTestCase = () => {
    if (!manualInput.trim() || !manualExpectedOutput.trim()) {
      setError("Both input and expected output are required!");
      return;
    }
    setManualTestCases([...manualTestCases, { input: manualInput, expectedOutput: manualExpectedOutput }]);
    setManualInput('');
    setManualExpectedOutput('');
    setError(null);
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      setError("Please enter some code before running.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    setOutput('');

    try {
      const results = [];

      const combinedTestCases = [
        ...(question?.testCases || []),
        ...manualTestCases
      ];

      for (let testCase of combinedTestCases) {
        const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
          language,
          version: "*",
          files: [{ content: code }],
          stdin: testCase.input  
        });

        const resultOutput = (response.data.run.output || '').trim();
        const expected = (testCase.expectedOutput || '').trim();

        if (resultOutput !== expected) {
          results.push(`❌ Test case failed:\nInput: ${testCase.input}\nExpected: ${expected}\nGot: ${resultOutput}`);
        }
      }

      if (results.length === 0) {
        setSuccessMessage(`✅ All test cases passed! You earned ${question.shardsReward} shards.`);
        setOutput('All tests passed.');
      } else {
        setOutput(results.join('\n\n'));
      }
    } catch (err) {
      console.error("Error running code:", err);
      setError("Something went wrong while running the code.");
    }

    setLoading(false);
  };

  if (error) return <p>{error}</p>;
  if (!question) return <p>Loading...</p>;

  return (
    <div className="solve-container">
  <div className="solve-content">
    {/* Left Section */}
    <div className="left-side">
      <h1>{question.title}</h1>
      <p>{question.description}</p>

      <h2 className="h3">
        <p className="gg">{question.difficulty}</p>
        <p className="gg">{question.shardsReward} 𖢻</p>
      </h2>

      <div className="expected-box">
        <h3>Expected Input/Output</h3>
        {question.testCases?.map((test, idx) => (
          <div key={idx} className="testcase-box">
            <p><strong>Input:</strong> {test.input}</p>
            <p><strong>Expected Output:</strong> {test.expectedOutput}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Right Section */}
    <div className="right-side">
      <div className="options-bar">
        <label htmlFor="language"> </label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="python3">Python</option>
          <option value="java">Java</option>
          <option value="go">Go</option>
        </select>
        <button className='hint'>Hint</button>
        <button className='solutions'>Solutions</button>
      </div>

      <splitPane  split="vertical" minSize={100} maxSize={window.innerWidth - 200}>

  <div className="left-pane" >
    <div className="resizable-editor" >
      <CodeMirror
        value={code}
        height="100%"
        theme={dracula}
        extensions={[          
          language === 'cpp' ? cpp() :
          language === 'python3' ? python() :
          language === 'java' ? java() :
          language === 'go' ? go() :
          cpp()]}
        onChange={setCode}
      />
    </div>
  </div>


<div>
  <div className="output-box-down">
    <button
      className="manual-test-toggle"
      onClick={() => setShowManualTest(!showManualTest)}
    >
      {showManualTest ? 'Hide Manual Test Cases' : 'Add Manual Test Cases'}
    </button>
  </div>

  {showManualTest ? (
    <div className="manual-test-box">
      <div className="manual-input">
        <h3>Manual Test Input</h3>
        <textarea
          placeholder="Enter input here..."
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
        />
      </div>

      <div className="manual-expected-output">
        <h3>Expected Output</h3>
        <textarea
          placeholder="Enter expected output here..."
          value={manualExpectedOutput}
          onChange={(e) => setManualExpectedOutput(e.target.value)}
        />
      </div>

      <button
        className="add-manual-button"
        onClick={handleAddManualTestCase}
        disabled={loading}
      >
        Add Test Case
      </button>

      {manualTestCases.length > 0 && (
        <div className="manual-test-list">
          <h4>Added Manual Test Cases:</h4>
          <ul>
            {manualTestCases.map((test, index) => (
              <li key={index}>
                <strong>Input:</strong> {test.input} | <strong>Expected:</strong> {test.expectedOutput}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <div className="output-box">
      <h3>Output:</h3>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <pre>{output}</pre>
    </div>
  )}
</div>

        
      </splitPane>

      <button
        onClick={handleRunCode}
        className="run-button"
        disabled={loading}
      >
        {loading ? 'Running...' : '▶ Run Code'}
      </button>
    </div>
  </div>
</div>

  );
};

export default SolvePage;
