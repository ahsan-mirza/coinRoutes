export const COINBASE_WS_URL = 'wss://ws-feed.pro.coinbase.com';

export const subscribeToTicker = (ws: WebSocket, pair: string) => {
  ws.send(
    JSON.stringify({
      type: 'subscribe',
      channels: [{ name: 'ticker', product_ids: [pair] }],
    })
  );
};

export const subscribeToLevel2 = (ws: WebSocket, pair: string) => {
  ws.send(
    JSON.stringify({
      type: 'subscribe',
      channels: [{ name: 'level2_batch', product_ids: [pair] }],
    })
  );
};
