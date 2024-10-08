import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
