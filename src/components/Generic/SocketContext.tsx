// SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios, { SOCKET_URL } from '../../api/axios';

const SocketContext:any = createContext(null);

export const SocketProvider = ({ children }:any) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState<any>([]);
  const [privateMessage, setPrivateMessages] = useState<any>([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket:any = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    // Event listeners for online users
    newSocket.on('onlineUsers', (users:any) => {setOnlineUsers(users)});

    // Event listener for receiving new messages
    newSocket.on('newMessage', (message:any) => {
      if (!message.isPrivate) {
      setMessages((prevMessages:any) => [...prevMessages, message]);
      }
    });

      // Listening for incoming private messages
      newSocket.on('privateMessageSent', (message:any) => {
        // Handle displaying the private message to the user
        setPrivateMessages((prevMessages:any) => [...(prevMessages || []), message]);
        console.log('Received a private message:', message);
      });

    
    // Set the socket instance in state
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // Function to emit the userConnected event
   const emitUserConnected = (userId:any, userType:any) => {
    if (socket) {
      socket.emit('userConnected', { userId, userType });
    
    }
  };
  if(socket){
    socket.on('messageDeleted', ({ id }:any) => {
      setMessages((prevMessages:any) => prevMessages.filter((msg:any) => msg.id !== id));
    });
  }


  
  const handleDeleteMessage = (messageId:any) => {
    socket.emit('deleteMessage', messageId);
  };
 // Function to emit a chat message
 const sendMessage = (message:any, senderId:any, senderType:any) => {
  if (socket) {
    socket.emit('chatMessage', { message, senderId, senderType });
  }
};
// Emitting a private message
const sendPrivateMessage = (message:any, receiverId:any, receiverType:any,userId:any,userType:any) => {
  socket.emit('privateMessage', {
    message,
    senderId: userId, // Current logged-in user ID
    senderType: userType, // 'student', 'teacher', or 'admin'
    receiverId,
    receiverType,
  });
};
  return (
    <SocketContext.Provider value={{ onlineUsers, emitUserConnected,sendMessage,messages,privateMessage,setMessages,handleDeleteMessage,sendPrivateMessage,setPrivateMessages }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket context
export const useSocket = () => useContext(SocketContext);
