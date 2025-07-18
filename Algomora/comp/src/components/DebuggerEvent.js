import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebuggerEvent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const userId = localStorage.getItem('userId'); // set after login
  const eventId = 'debugger'; // you can make this dynamic too

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('/api/debugger/questions');
      setQuestions(res.data);
      setStartTime(Date.now());
    };
    fetchQuestions();
  }, []);

  const checkOutput = async () => {
    try {
      const blob = new Blob([userCode], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);

      return new Promise((resolve, reject) => {
        worker.onmessage = (e) => resolve(e.data);
        worker.onerror = (e) => reject(e.message);
        worker.postMessage('');
        setTimeout(() => worker.terminate(), 2000);
      });
    } catch (e) {
      return 'Error';
    }
  };

  const handleSubmit = async () => {
    const actual = questions[currentIndex]?.expectedOutput.trim();
    let result;
    try {
      result = await checkOutput();
    } catch {
      result = 'Error';
    }

    if (result.toString().trim() === actual) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setUserCode('');
      } else {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        await axios.post('/api/debugger/submit', { userId, eventId, timeTaken });
        setSubmitted(true);
        fetchLeaderboard();
      }
    } else {
      alert('Incorrect output. Try again.');
    }
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get(`/api/debugger/leaderboard/${eventId}`);
    setLeaderboard(res.data);
  };

  if (questions.length === 0) return <div>Loading questions...</div>;
  if (submitted)
    return (
      <div>
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((entry, i) => (
            <li key={i}>{entry.username} - {entry.timeTaken}s</li>
          ))}
        </ul>
      </div>
    );

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ zoom: '0.9', padding: '1rem' }}>
      <h2>{currentQuestion.title}</h2>
      <pre style={{ background: '#f0f0f0', padding: '10px' }}>
        {currentQuestion.buggyCode}
      </pre>
      <textarea
        rows="6"
        cols="60"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        placeholder="Fix the code above"
        style={{ display: 'block', margin: '1rem 0' }}
      />
      <button onClick={handleSubmit}>Submit Fix</button>
    </div>
  );
};

export default DebuggerEvent;
