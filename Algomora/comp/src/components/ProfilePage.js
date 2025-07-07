import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../components/profile.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cards, setCards] = useState([]);
  const [shards, setShards] = useState(0);
  const [house, setHouse] = useState(null);
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const fileInputRef = useRef(null);

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
        const response = await axios.get(`http://localhost:5001/recommendations/${userId}`);
        setRecommendedQuestions(response.data.recommendations || []);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
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
              <h3>Wizarding Rank : NULL</h3>
              <div className="shards">Shards: {shards}</div>
            </div>
          </div>

          <div className="cards-section">
            <h4>Cards Earned:</h4>
            <ul className="card-list">
              {cards.map((card) => (
                <li key={card._id}>
                  <img src={`http://localhost:5000${card.image}`} alt={card.name} />
                </li>
              ))}
            </ul>
          </div>

          <div className="recommendations-section">
            <h4>🧠 Recommended Questions:</h4>
            <ul className="recommendation-list">
              {recommendedQuestions.map((question, idx) => (
                <li key={idx}>
                  <strong>{question.problem_id}</strong> – {question.title || 'Untitled'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
