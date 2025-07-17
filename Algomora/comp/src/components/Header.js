import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/header.css';
import { getUserData } from '../api/api';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [photo, setPhoto] = useState(null);
  const [house, setHouse] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('userId');
  navigate('/login');
};

  useEffect(() => {
    if (!userId) return;

    let previousHouseClass = null;

    getUserData(userId)
      .then(response => {
        setPhoto(response.data.photo);
        const userHouse = response.data.house ? response.data.house.toLowerCase() : null;
        setHouse(userHouse);

        if (userHouse) {
          // Remove old house classes
          ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'].forEach(h => {
            document.body.classList.remove(h);
          });
          document.body.classList.add(userHouse);
          previousHouseClass = userHouse;
        }
      })
      .catch(err => console.error('Failed to fetch user for header', err));

    return () => {
      if (previousHouseClass) {
        document.body.classList.remove(previousHouseClass);
      }
    };
  }, [userId]);

  return (
    <>
      <header>
        <nav>
          
          <ul>
            <span className="hogwarts-crest" />
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/questions">Questions</Link></li>
            
            <li><Link to= "/events">Events</Link></li>
            <li><Link to= "/leaderboard">Leaderboard</Link></li>
          </ul>
          <ul className="right">
  {userId && (
    <>
      <li className="header-user-info">
        <Link to={`/profile/${userId}`} className="header-profile-link">
          <span className="house-icon" aria-label={`${house} emblem`} />
          {photo && (
            <img
              src={`http://localhost:5000${photo}`}
              alt="Profile"
              className="header-profile-photo"
            />
          )}
        </Link>
      </li>
      <li>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  )}
</ul>

        </nav>
      </header>
      <div className="header-fade" />
    </>
  );
};

export default Header;
