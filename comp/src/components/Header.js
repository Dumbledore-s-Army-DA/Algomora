import React from 'react';
import { Link } from 'react-router-dom';
import '../components/header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
          <li>
            <Link to="/shards">Shards</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
