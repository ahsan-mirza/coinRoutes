import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface OrderBookProps {
  pair: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ pair }) => {
  const { orderBook, error } = useWebSocket(pair);

  if (error) return <div>Error: {error}</div>;
  if (!orderBook) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-4">
      <h2 className="text-xl font-bold">Order Book for {pair}</h2>
      <div className="mt-2">
        <div className="flex">
          <div className="w-1/2">
            <h3 className="font-bold">Bids</h3>
            {orderBook.bids.map((bid, index) => (
              <p key={index}>{bid.price} - {bid.size}</p>
            ))}
          </div>
          <div className="w-1/2">
            <h3 className="font-bold">Asks</h3>
            {orderBook.asks.map((ask, index) => (
              <p key={index}>{ask.price} - {ask.size}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
