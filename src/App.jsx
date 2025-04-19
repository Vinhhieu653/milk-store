import './App.css';

import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/pages/LandingPage';

function App() {
  return (
    <div className='App'>
      <LandingPage />
      <ToastContainer />
    </div>
  );
}

export default App;

