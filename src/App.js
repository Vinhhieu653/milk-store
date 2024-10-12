
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage';




function App() {
  return (
    <div className="App">
      <LandingPage />
      <ToastContainer />
    </div>
  );
}

export default App;
