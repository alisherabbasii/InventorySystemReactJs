// AppContent.js
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import MainRouting from './Routing/Main';
import { useSocket } from './components/Generic/SocketContext';

const AppContent = () => {

  return <MainRouting />;
};

export default AppContent;
