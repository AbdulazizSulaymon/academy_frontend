import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { baseBackendUrl } from '@data/const';
import { useApi } from '@src/api';

type UseSocketReturnType = {
  socket: Socket | null;
};

export const useSocket = (): UseSocketReturnType => {
  const api = useApi();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) return;

    const socketInstance = io(baseBackendUrl, {
      transports: ['websocket'],
      query: { token: api.getToken() },
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket };
};
