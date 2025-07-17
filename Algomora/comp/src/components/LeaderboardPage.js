import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './leaderboard.css';

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaderboard')
      .then(res => {
      const filtered = res.data.filter(user => user.username === 'sss' || user.username === 'shivu');
      setLeaders(filtered);
    })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 LEADERBOARD 🏆</h2>
      <table>
        <thead>
          <tr><th>Rank</th><th>Name</th><th>House</th><th>Shards</th><th>Solved</th></tr>
        </thead>
        <tbody>
          {leaders.map((user, i) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.house}</td>
              <td>{user.shards}</td>
              <td>{user.solvedCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
