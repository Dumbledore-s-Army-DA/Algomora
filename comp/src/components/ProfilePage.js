import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/profile.css'; // Assuming you have a CSS file for styling
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

      axios.post(`http://localhost:5000/api/users/uploadPhoto/${userId}`, formData)
        .then(response => setPhoto(response.data.photo))
        .catch(err => console.error('Photo upload error:', err));
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div>
        <h3>Name: {name}</h3>
        <input type="file" onChange={handlePhotoChange} />
        {photo && <img src={`http://localhost:5000${photo}`} alt="Profile" width="150" />}
      </div>
      <div>
        <h4>Cards Earned:</h4>
        <ul>
          {cards.map(card => <li key={card._id}>{card.name}</li>)}
        </ul>
      </div>
      <div>
        <h4>Shards: {shards}</h4>
      </div>
    </div>
  );
};

export default ProfilePage;