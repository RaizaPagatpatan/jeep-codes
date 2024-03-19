import logo from './logo.svg';
import React from 'react';


const NavBar = () => {
  return (
    //App bar
    <div className="appBar">
      <div className="logoContainer">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="myName">Raiza J. Pagatpatan</span>
        <span className="myName">&nbsp; JEEP CODES</span>
      </div>
      
      <nav className="tabs">
        <button>HOME</button>
        <button>PROFILE</button>
        <button>MESSAGE</button>
        <button>LOGOUT</button>
      </nav>
    </div>
  );
};


export default NavBar;