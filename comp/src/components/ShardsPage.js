import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShardsPage = () => {
  const [shards, setShards] = useState([]);
  const [userId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchShards = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shards/${userId}`);
        setShards(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShards();
  }, [userId]);

  return (
    <div className="shards-container">
      <h2>Your Shards</h2>
      <ul>
        {shards.map(shard => (
          <li key={shard._id}>
            <p>{shard.name}</p>
            <p>Amount: {shard.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShardsPage;
