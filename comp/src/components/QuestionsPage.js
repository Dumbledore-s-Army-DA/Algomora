import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/question.css'; // Make sure this matches the updated CSS below

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('Easy'); 
  const [shards, setShards] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions/difficulty/${difficulty}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  return (
    <div className="questions-container">
      <h1 className="questions-title">Difficulty</h1>

      <select 
        className="difficulty-select"
        onChange={(e) => setDifficulty(e.target.value)} 
        value={difficulty}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <div className="shards-section">
        <h2>Shards on Solve:</h2>
        <p className="shards-count">{shards}</p>
      </div>

      <div className="questions-list">
        <h2>Questions</h2>
        {questions.length === 0 ? (
          <p className="no-questions">No questions found for this difficulty.</p>
        ) : (
          questions.map((question) => (
            <div key={question._id} className="question-item">
              <div className='line'>
              <h3>{question.title}</h3>

              <p>{question.difficulty}</p>
              <p><strong>Shards Reward:</strong> {question.shardsReward}</p>
              <Link to={`/solve/${question._id}`} className="solve-button">
                Solve 
              </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
