import { useEffect, useRef, useState } from 'react';

const COINBASE_WS_URL = 'wss://ws-feed.exchange.coinbase.com';
const RECONNECT_INTERVAL = 5000; // Interval for reconnect attempts in milliseconds

interface Order {
  price: string;
  size: string;
}

interface OrderBook {
  bids: Order[];
  asks: Order[];
}

export const useWebSocket = (pair: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [topOfBook, setTopOfBook] = useState<{ bid: Order; ask: Order } | null>(null);
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createWebSocket = () => {
    socketRef.current = new WebSocket(COINBASE_WS_URL);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      const subscribeMessage = {
        type: 'subscribe',
        channels: [
          {
            name: 'ticker',
            product_ids: [pair],
          },
          {
            name: 'level2_batch',
            product_ids: [pair],
          },
        ],
      };
      socketRef.current?.send(JSON.stringify(subscribeMessage));
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        

        if (data.type === 'ticker' && data.product_id === pair) {
        
          const bid = { price: data.best_bid, size: data.best_bid_size };
          const ask = { price: data.best_ask, size: data.best_ask_size };
          setTopOfBook({ bid, ask });
        }

        if (data.type === 'l2update' && data.product_id === pair) {
          const updatedBids = data.changes
            .filter((change: any) => change[0] === 'buy')
            .map((change: any) => ({ price: change[1], size: change[2] }));
          
          const updatedAsks = data.changes
            .filter((change: any) => change[0] === 'sell')
            .map((change: any) => ({ price: change[1], size: change[2] }));
          
          setOrderBook((prevOrderBook) => ({
            bids: [...(prevOrderBook?.bids || []), ...updatedBids],
            asks: [...(prevOrderBook?.asks || []), ...updatedAsks],
          }));
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
        setError('Error parsing WebSocket message');
      }
    };

    socketRef.current.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('WebSocket error');
    };

    socketRef.current.onclose = (event) => {
      console.log('WebSocket closed:', event);
      setError('WebSocket disconnected. Reconnecting...');
      setTimeout(() => createWebSocket(), RECONNECT_INTERVAL);
    };
  };

  useEffect(() => {
    createWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [pair]);

  return { topOfBook, orderBook, error };
};
