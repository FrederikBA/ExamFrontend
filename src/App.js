import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Admin from './components/Admin';
import AssistantTable from './components/AssistantTable';
import UserBookings from './components/UserBookings';
import CreateBooking from './components/CreateBooking';
import CreateAssistant from './components/CreateAssistant';
import NoMatch from './components/NoMatch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoles, setCurrentRoles] = useState([]);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} onLogout={() => { localStorage.clear(); setIsLoggedIn(false) }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path='landing-page' element={<LandingPage currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} />} />
        <Route path='book' element={<CreateBooking currentRoles={currentRoles} />} />
        <Route path='your-bookings' element={<UserBookings currentRoles={currentRoles} />} />
        <Route path='assistants' element={<AssistantTable currentRoles={currentRoles} />} />
        <Route path='admin' element={<Admin currentRoles={currentRoles} />} />
        <Route path='create-assistant' element={<CreateAssistant currentRoles={currentRoles} />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div >
  );
}

export default App;
