import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  TooltipProps,
} from 'recharts';
import { useWebSocket } from '../hooks/useWebSocket';
import Spinner from './Spinner';

interface RealTimePriceChartProps {
  pair: string;
}

interface ChartData {
  timestamp: number;
  bidPrice: number;
  askPrice: number;
}

const RealTimePriceChart: React.FC<RealTimePriceChartProps> = ({ pair }) => {
  const { topOfBook } = useWebSocket(pair);
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

  if (!topOfBook) return <Spinner />;

  const customTooltipFormatter = (value: number | string) => {
    if (typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    return value;
  };

  return (
    <div className='mt-5 bg-gray-800 text-white p-4 rounded-md shadow-md'>
      <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
          tick={{ fill: '#ccc', fontSize: 12 }}
        >
          <Label value="Time" offset={0} position="insideBottomRight" fill="#ccc" />
        </XAxis>
        <YAxis
          tickFormatter={(tick) => `$${tick.toFixed(2)}`}
          tick={{ fill: '#ccc', fontSize: 12 }}
        >
          <Label value="Price" angle={-90} position="insideLeft" offset={10} fill="#ccc" />
        </YAxis>
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
          formatter={customTooltipFormatter}
          contentStyle={{ backgroundColor: '#333', borderColor: '#555', borderRadius: 4 }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ paddingBottom: 10, color: '#ccc' }}
          iconType="line"
        />
        <Line
          type="monotone"
          dataKey="bidPrice"
          stroke="#ff7300"
          strokeWidth={2}
          dot={{ stroke: '#ff7300', strokeWidth: 2, r: 4 }}
          activeDot={{ stroke: '#ff7300', strokeWidth: 2, r: 6 }}
          name="Bid Price"
        />
        <Line
          type="monotone"
          dataKey="askPrice"
          stroke="#387908"
          strokeWidth={2}
          dot={{ stroke: '#387908', strokeWidth: 2, r: 4 }}
          activeDot={{ stroke: '#387908', strokeWidth: 2, r: 6 }}
          name="Ask Price"
        />
      </LineChart>
    </ResponsiveContainer>
    </div>
    
  );
};

export default RealTimePriceChart;
