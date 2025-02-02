import React, {createContext, useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {io} from 'socket.io-client';

type SocketType = ReturnType<typeof io> | null;
type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

const SocketContext = createContext<{
  socket: SocketType;
  connectionStatus: ConnectionStatus;
} | null>(null);

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
  const [socket, setSocket] = useState<SocketType>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('connecting');
  const {token} = useSelector((state: any) => state.auth);
  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io('https://rationally-charming-horse.ngrok-free.app', {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token,
      },
    });

    setSocket(newSocket);

    // Listen for connection events
    newSocket.on('connect', () => {
      setConnectionStatus('connected');
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      console.log('Socket disconnected');
    });

    newSocket.on('connect_error', err => {
      console.error('Connection error:', err.message);
      setConnectionStatus('disconnected');
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{socket, connectionStatus}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
