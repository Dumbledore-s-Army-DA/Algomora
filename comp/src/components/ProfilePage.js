import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/profile.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cards, setCards] = useState([]);
  const [shards, setShards] = useState(0);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const data = response.data;
        setUserData(data);
        setName(data.name);
        setPhoto(data.photo);
        setCards(data.cards);
        setShards(data.shards);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

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
    <div className="profile-container">
      

      <div className="profile-info">
        <div className="profile-photo">
          {photo && <img src={`http://localhost:5000${photo}`} alt="Profile" />}
        </div>
        <div className="profile-details">
          <h3>{name}</h3>
          <input type="file" onChange={handlePhotoChange} />
          <div className="shards">Shards: {shards}</div>
        </div>
      </div>

      <div className="cards-section">
        <h4>Cards Earned:</h4>
        <ul className="card-list">
          {cards.map((card) => (
            <li key={card._id}>
              <img src={card.image} alt={card.name} />
              <span>{card.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
