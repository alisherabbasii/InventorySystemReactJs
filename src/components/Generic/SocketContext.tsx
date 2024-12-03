// SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext:any = createContext(null);

export const SocketProvider = ({ children }:any) => {
  
  return (
   <></>
  );
};

// Custom hook to use socket context
export const useSocket = () => useContext(SocketContext);
