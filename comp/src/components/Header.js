import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/header.css';
import { getUserData } from '../api/api';

const Header = () => {
  const [photo, setPhoto] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then(response => {
          setPhoto(response.data.photo);
        })
        .catch(err => console.error('Failed to fetch user for header', err));
    }
  }, [userId]);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/questions">Questions</Link></li>
          <li><Link to="/shards">Shards</Link></li>
        </ul>
        <ul className="right">
          {userId && photo && (
            <li>
              <Link to={`/profile/${userId}`}>
                <img
                  src={`http://localhost:5000${photo}`}
                  alt="Profile"
                  className="header-profile-photo"
                />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
