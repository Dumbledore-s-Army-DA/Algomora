import React from 'react';

const RecommendList = ({ recommendations }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">Top 10 Recommended Questions</h2>
      <ul className="list-decimal ml-6">
        {recommendations.map((item, index) => (
          <li key={index}>
            Question ID: <strong>{item.question_id}</strong> | Score: {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendList;
