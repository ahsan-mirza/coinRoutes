import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import TopOfBook from '../components/TopOfBook';
import OrderBook from '../components/OrderBook';

const Home: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('BTC-USD');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Trading View</h1>
      <Dropdown selectedPair={selectedPair} onSelectPair={setSelectedPair} />
      <TopOfBook pair={selectedPair} />
      <OrderBook pair={selectedPair} />
    </div>
  );
};

export default Home;
