import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DeleteUser from './Routes/DeleteUser';
import Home from './Routes/Home/Home';
import Login from './Routes/Login';
import NotFound from './Routes/NotFound';
import Register from './Routes/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/DeleteUser' element={<DeleteUser />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
