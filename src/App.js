import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import  Home  from './components/Home';
import About from './components/About';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
function App() {
  return (
    
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message="success"/>
    <div className='container'>
    <Routes>
     
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
  </Routes>
  </div>
  </BrowserRouter>
  </NoteState>
  </>
  );
}

export default App;
