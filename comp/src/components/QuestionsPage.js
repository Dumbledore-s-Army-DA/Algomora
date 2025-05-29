import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/question.css';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [shards, setShards] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [questionCounts, setQuestionCounts] = useState({ Easy: 0, Medium: 0, Hard: 0 });
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        const allQuestions = response.data;
        const counts = { Easy: 0, Medium: 0, Hard: 0 };
        allQuestions.forEach(q => counts[q.difficulty]++);
        setQuestionCounts(counts);
      } catch (error) {
        console.error('Error fetching question counts:', error);
      }
    };
    fetchAllQuestions();
  }, []);

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    try {
      const response = await axios.get(`http://localhost:5000/api/questions/random`);
      setDailyQuestion(response.data);
    } catch (error) {
      console.error('Error fetching random question:', error);
    }
  };

  return (
    <div className="questions-container">
      <div className="left-section">
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

        <input
          type="text"
          placeholder="Search questions..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="questions-list">
          <h2>Questions</h2>
          {questions.length === 0 ? (
            <p className="no-questions">No questions found for this difficulty.</p>
          ) : (
            questions
              .filter((question) =>
                question.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((question) => (
                <div key={question._id} className="question-item">
                  <div className="line">
                    <h3>{question.title}</h3>
                    <p>{question.difficulty}</p>
                    <p><strong>Shards Reward:</strong> {question.shardsReward}</p>
                    <Link to={`/solve/${question._id}`} className="solve-button">Solve</Link>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      <div className="right-section">
        <Calendar onClickDay={handleDateClick} value={selectedDate} />
        {dailyQuestion && (
          <div className="daily-question">
            <h3>Daily Question</h3>
            <p><strong>{dailyQuestion.title}</strong></p>
            <p>Difficulty: {dailyQuestion.difficulty}</p>
            <Link to={`/solve/${dailyQuestion._id}`} className="solve-button">Solve</Link>
          </div>
        )}

        <div className="question-counts">
          <h3>Question Stats</h3>
          <p>Easy: {questionCounts.Easy}</p>
          <p>Medium: {questionCounts.Medium}</p>
          <p>Hard: {questionCounts.Hard}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
