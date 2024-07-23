import { useState } from 'react';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import InvoiceDetails from './pages/InvoiceDetails';
import Home from './pages/Home';

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/invoice/:id' element={<InvoiceDetails />} />
      </Routes>
    </>
  );
}

export default App;
