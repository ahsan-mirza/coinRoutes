import React from 'react';

interface DropdownProps {
  selectedPair: string;
  onSelectPair: (pair: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedPair, onSelectPair }) => {
  const pairs = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'];

  return (
    <div className="mb-6">
      <label htmlFor="pair" className="block text-sm font-semibold text-gray-800 mb-2">
        Select a Currency Pair
      </label>
      <div className="relative">
        <select
          id="pair"
          name="pair"
          value={selectedPair}
          onChange={(e) => onSelectPair(e.target.value)}
          className="block w-full pl-4 pr-4 py-3 text-base border border-gray-300 rounded-lg shadow-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-150 ease-in-out appearance-none"
        >
          {pairs.map((pair) => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
