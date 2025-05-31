import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';
import QuestionsPage from './components/QuestionsPage';
import ShardsPage from './components/ShardsPage';
import Header from './components/Header';
import SolvePage from './components/SolvePage';
import Footer from './components/Footer';
import SortingHatPage from './components/SortingHatPage';
import './components/question.css'; // or wherever it is located


const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/solve/:id" element={<SolvePage />} />
          <Route path="/sorting" element={<SortingHatPage />} />
          <Route path="/shards" element={<ShardsPage />} />
        </Routes>
      </div>

    </Router>
  );
};

export default App;
