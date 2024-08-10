import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface TopOfBookProps {
  pair: string;
}

const TopOfBook: React.FC<TopOfBookProps> = ({ pair }) => {
  const { topOfBook, error } = useWebSocket(pair);

  if (error) return <div>Error: {error}</div>;
  if (!topOfBook) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Top of Book for {pair}</h2>
      <div className="mt-2">
        <p>Bid: <span className="text-green-500 font-semibold">{topOfBook.bid.price}</span> Size: {topOfBook.bid.size}</p>
        <p>Ask: <span className="text-red-500 font-semibold">{topOfBook.ask.price}</span> Size: {topOfBook.ask.size}</p>
      </div>
    </div>
  );
};

export default TopOfBook;
