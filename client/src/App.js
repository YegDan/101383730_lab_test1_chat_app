import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatroom from './components/Chatroom';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatroom" element={<Chatroom />} />
        </Routes>
      </Router>

    </AuthProvider>
   
    
      
    
  );
}

export default App;
