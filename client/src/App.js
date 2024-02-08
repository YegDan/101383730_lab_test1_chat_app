import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatroom from './components/Chatroom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/chatroom" element={<Chatroom/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </Router>
    
      
    
  );
}

export default App;
