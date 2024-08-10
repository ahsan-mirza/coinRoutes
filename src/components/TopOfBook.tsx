import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import Spinner from './Spinner';

interface TopOfBookProps {
  pair: string;
}

const TopOfBook: React.FC<TopOfBookProps> = ({ pair }) => {
  const { topOfBook} = useWebSocket(pair);
  if (!topOfBook) return <Spinner />;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Top of Book for {pair}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-medium text-green-300 mb-2">Bid</h3>
          <p className="text-2xl font-bold text-green-400">{topOfBook.bid.price}</p>
          <p className="text-sm text-gray-300">Size: {topOfBook.bid.size}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-medium text-red-300 mb-2">Ask</h3>
          <p className="text-2xl font-bold text-red-400">{topOfBook.ask.price}</p>
          <p className="text-sm text-gray-300">Size: {topOfBook.ask.size}</p>
        </div>
      </div>
    </div>
  );
};

export default TopOfBook;
