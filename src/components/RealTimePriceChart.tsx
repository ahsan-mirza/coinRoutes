import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWebSocket } from '../hooks/useWebSocket';

interface RealTimePriceChartProps {
  pair: string;
}

interface ChartData {
  timestamp: number;
  bidPrice: number;
  askPrice: number;
}

const RealTimePriceChart: React.FC<RealTimePriceChartProps> = ({ pair }) => {
  const { topOfBook, error } = useWebSocket(pair);
  const [data, setData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    if (topOfBook) {
      const newDataPoint: ChartData = {
        timestamp: Date.now(),
        bidPrice: parseFloat(topOfBook.bid.price),
        askPrice: parseFloat(topOfBook.ask.price),
      };
      setData((prevData) => [...prevData, newDataPoint].slice(-50)); // Keep last 50 data points
    }
  }, [topOfBook]);

  if (error) return <div>Error: {error}</div>;
  if (!topOfBook) return <div>Loading...</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(tick:any) => new Date(tick).toLocaleTimeString()}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label: number) => new Date(label).toLocaleTimeString()}
        />
        <Legend />
        <Line type="monotone" dataKey="bidPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="askPrice" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RealTimePriceChart;
