import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../components/profile.css';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cards, setCards] = useState([]);
  const [shards, setShards] = useState(0);
  const [house, setHouse] = useState(null);
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    let previousHouseClass = null;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const data = response.data;

        setUserData(data);
        setName(data.name);
        setPhoto(data.photo);
        setCards(data.cards);
        setShards(data.shards);

        const userHouse = data.house ? data.house.toLowerCase() : null;
        setHouse(userHouse);

        ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'].forEach(h => {
          document.body.classList.remove(h);
        });

        if (userHouse) {
          document.body.classList.add(userHouse);
          previousHouseClass = userHouse;
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    const fetchRecommendations = async () => {
  try {
    // 🔁 Step 1: Send userId to ML recommendation API
    const res = await axios.post(`http://127.0.0.1:5001/recommend`, {
      user_id: userId,
    });

    console.log("🧠 Raw recommendation response:", res.data);

    // ✅ Step 2: Extract recommendations safely
    const recommendations = res.data.recommendations || [];

    console.log("🧠 Type of recommendations:", typeof recommendations);
    console.log("🧠 Is Array:", Array.isArray(recommendations));

    // ✅ Step 3: Map question_id from ML to problemIds for DB
    const problemIds = recommendations.map((rec) => rec.question_id);
    console.log("📦 Sending problemIds:", problemIds);

    // ✅ Step 4: Send problemIds to backend to fetch full questions
    const questionsRes = await axios.post(
      'http://localhost:5000/api/questions/byIds',
      { problemIds: problemIds }
    );

    console.log("✅ Recommended Questions:", questionsRes.data);

    // ✅ Step 5: Update state with fetched questions
    setRecommendedQuestions(questionsRes.data);
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
  }
};



    if (userId) {
      fetchUserData();
      fetchRecommendations();
    }

    return () => {
      if (previousHouseClass) {
        document.body.classList.remove(previousHouseClass);
      }
    };
  }, [userId]);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      axios
        .post(`http://localhost:5000/api/users/uploadPhoto/${userId}`, formData)
        .then((response) => setPhoto(response.data.photo))
        .catch((err) => console.error('Photo upload error:', err));
    }
  };

  const uniqueCards = Array.from(new Map(cards.map(card => [card._id, card])).values());

  return (
    <div className='zoom-wrapper'>
      <div className="profile-frame-wrapper">
        <img
          src={`/images/${house}Frame.png`}
          alt={`${house} Crest Frame`}
          className="container-crest-frame"
        />

        <div className="profile-container">
          <div className="profile-info">
            <div
              className="profile-photo"
              onClick={handlePhotoClick}
              style={{ cursor: 'pointer' }}
            >
              {photo && (
                <>
                  <img
                    src={`http://localhost:5000${photo}`}
                    alt="Profile"
                    className="profile-img"
                  />
                  <img
                    src="/images/frame121.png"
                    alt="Crest Frame"
                    className="crest-frame"
                  />
                </>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />

            <div className="profile-details">
              <h3>Name : {name}</h3>
              <h3>House : {house}</h3>
              <h3>Wizarding Rank : Null</h3>
              <div className="shards">
                Shards: {shards}
              </div>
            </div>
          </div>

          <div className="cards-section">
            <h4>Cards Earned:</h4>
            <ul className="card-list">
              {uniqueCards.map((card) => (
                <li key={card._id}>
                  <img src={`${card.image}`} alt={card.name} />
                </li>
              ))}
            </ul>
          </div>

          <div className="recommendations-section">
            <h4>🧠 Recommended Questions:</h4>
            <div className="question-card-container">
              {recommendedQuestions.map((q) => (
                <div className="question-card" key={q.problem_id}>
                  <h3>{q.title}</h3>
                  <p><strong>Difficulty:</strong> {q.difficulty}</p>
                  <p><strong>Shards:</strong> {q.shardsReward} ✶</p>
                  <button className="solve-btn" onClick={() => navigate(`/solve/${q._id}`)}>
  Solve
</button>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
