import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import Spinner from './Spinner';

interface OrderBookProps {
  pair: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ pair }) => {
  const { orderBook, error } = useWebSocket(pair);


  if (!orderBook) return <Spinner />;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md mt-4 h-[400px] overflow-auto">
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Order Book for {pair}</h2>
      <div className="flex justify-between h-full">
        <div className="w-1/2 border-r border-gray-700 pr-2">
          <h3 className="font-bold text-lg mb-2">Bids</h3>
          <div className="space-y-2">
            {orderBook.bids.reverse().length > 0 ? (
              orderBook.bids.map((bid, index) => (
                <div key={index} className="flex justify-between text-green-400">
                  <span>{bid.price}</span>
                  <span>{bid.size}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No bids available</p>
            )}
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="font-bold text-lg mb-2">Asks</h3>
          <div className="space-y-2">
            {orderBook.asks.reverse().length > 0 ? (
              orderBook.asks.map((ask, index) => (
                <div key={index} className="flex justify-between text-red-400">
                  <span>{ask.price}</span>
                  <span>{ask.size}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No asks available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
