import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Notfound from './components/Notfound';
import Track from './components/Track';
import Private from './components/Private';
import FoodList from "./components/FoodList";
import { UserContext } from './contexts/UserContext';
import { useEffect, useState } from 'react';
import Diet from './components/Diet';
import TrackFood from './components/TrackFood';

function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('nutrify-user')));

  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track" element={<Private Component={Track} />} />
            <Route path="/diet" element={<Private Component={Diet} />} />
            <Route path="/foodlist" element={<Private Component={FoodList} />} />
            <Route path="/track/:id" element={<Private Component={TrackFood} />} /> {/* Add this route */}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
