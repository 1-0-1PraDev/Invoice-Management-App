import React, { useState } from 'react'
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Main from '../components/Main/Main';

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsSideBarOpen(false);
  }

  return (
    <div className='main-container'>
      { isSideBarOpen && <Sidebar onCloseSidebar={handleCloseSidebar} isSideBarOpen={isSideBarOpen} />}
      <Main setIsSideBarOpen={setIsSideBarOpen}/>
    </div> 
  )
}

export default Home;