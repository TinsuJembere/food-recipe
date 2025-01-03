import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Details from './pages/details';
import GlobalState from './context';

function App() {
  return (
    <div>
      <div className='min-h-screen p-6 bg-white text-lg text-gray'>
        <GlobalState> 
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/recipe-item/:id' element={<Details />} />
          </Routes>
        </GlobalState>
      </div>
    </div>
  );
}

export default App;
