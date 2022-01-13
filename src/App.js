import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import AssistantTable from './components/AssistantTable';
import UserBookings from './components/UserBookings';
import CreateBooking from './components/CreateBooking';
import ManageAssistants from './components/ManageAssistants';
import Bookings from './components/Bookings';
import AssignAssistants from './components/AssignAssistants';
import EditBooking from './components/EditBooking';
import Cars from './components/Cars';
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
        <Route path='book' element={<CreateBooking />} />
        <Route path='your-bookings' element={<UserBookings />} />
        <Route path='assistants' element={<AssistantTable />} />
        <Route path='create-assistant' element={<ManageAssistants />} />
        <Route path='bookings' element={<Bookings />} />
        <Route path='assign-assistants/:id' element={<AssignAssistants />} />
        <Route path='edit-booking/:id' element={<EditBooking />} />
        <Route path='cars' element={<Cars />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div >
  );
}

export default App;
