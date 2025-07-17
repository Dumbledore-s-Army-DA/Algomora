import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sorting.css';

const questions = [
  {
    q: "You're walking through a dark forest and hear a sound behind you. What do you do?",
    answers: [
      { text: "Draw your wand and confront it", house: 'gryffindor' },
      { text: "Strategically hide and analyze", house: 'ravenclaw' },
      { text: "Look for a way to use it to your advantage", house: 'slytherin' },
      { text: "Stay calm and offer help if needed", house: 'hufflepuff' },
    ]
  },
  {
    q: "Which magical subject excites you most?",
    answers: [
      { text: "Defense Against the Dark Arts", house: 'gryffindor' },
      { text: "Charms", house: 'ravenclaw' },
      { text: "Potions", house: 'slytherin' },
      { text: "Herbology", house: 'hufflepuff' },
    ]
  },
  {
    q: "Choose a magical creature:",
    answers: [
      { text: "Phoenix", house: 'gryffindor' },
      { text: "Thestral", house: 'slytherin' },
      { text: "Hippogriff", house: 'ravenclaw' },
      { text: "Niffler", house: 'hufflepuff' },
    ]
  }
];

const SortingHatPage = () => {
  const [step, setStep] = useState(0);
  const [houseTally, setHouseTally] = useState({});
  const [showReaction, setShowReaction] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [finalHouse, setFinalHouse] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  const handleAnswer = (house) => {
    const reactions = ['Hmm...', 'Interesting...', 'Fascinating...', 'Ah yes...'];
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

    speak(randomReaction);
    setShowReaction(true);

    const updatedTally = { ...houseTally, [house]: (houseTally[house] || 0) + 1 };
    setHouseTally(updatedTally);

    setTimeout(() => {
      setShowReaction(false);
      const nextStep = step + 1;
      if (nextStep < questions.length) {
        setStep(nextStep);
      } else {
        const sortedHouse = Object.entries(updatedTally).sort((a, b) => b[1] - a[1])[0][0];
        const houseName = sortedHouse.charAt(0).toUpperCase() + sortedHouse.slice(1);

        axios.patch(`http://localhost:5000/api/users/${userId}`, { house: sortedHouse })
          .then(() => {
            setFinalHouse(houseName);
            setShowHouseModal(true);
            speak(`You belong in... ${houseName}!`);
            setTimeout(() => {
              setShowHouseModal(false);
              navigate('/topicform');
            }, 4000);
          })
          .catch((err) => console.error("Failed to update house:", err));
      }
    }, 1500);
  };

  if (!userData) {
    return (
      <div className="sorting-hat-container">
        <p>Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="sorting-hat-container">
      <h2>The Sorting Hat</h2>
      <h2>{userData.name}</h2>

      {showReaction ? (
        <p><i>The hat is thinking...</i></p>
      ) : (
        <>
          <p>{questions[step].q}</p>
          <div className="answers">
            {questions[step].answers.map((a, idx) => (
              <button key={idx} onClick={() => handleAnswer(a.house)}>{a.text}</button>
            ))}
          </div>
        </>
      )}

      {showHouseModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🎉 Welcome to {finalHouse}!</h2>
            <p>The Sorting Hat has spoken. Prepare for glory!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingHatPage;
