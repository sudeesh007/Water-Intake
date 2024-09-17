import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import checkAuth from "./auth/checkauth";


function Aboutus() {

    const bodyStyles = {
        backgroundImage: 'url("https://i.pinimg.com/736x/ea/a9/63/eaa96374b2f67305090496b0cc47c424.jpg")', 
        minHeight: '100vh', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
      };

    const homeStyles = {
        color: 'blue',
        fontSize: '20px',
        textAlign: 'center',
        textdecoration:'underline',
      };

    const haveStyles = {
        color: 'red',
        fontSize: '18px',
        textAlign: 'center',
        
      };

    const linkContainerStyles = {
        textAlign: 'center',
        marginTop: '20px',
      };

    return (
      
        <div style={bodyStyles}>
          <Navbar/>
          <div>
            <h1 style={homeStyles}>About Us</h1>
            <br></br>
            <br></br>
            <h2 style={haveStyles}>THIS IS THE OFFICIAL SITE OF KERALA WATER AUTHORITIES WATER MANAGEMENT SYSTEM. YOU ARE ABLE TO ADD YOUR WATER INTAKE WITH CORRESPONDING TIME. YOU CAN EDIT AND DELETE THE QUANTITY OF WATER.</h2>
            
            <div style={linkContainerStyles}>
                <Link to="/home">Go Home</Link>
              </div>
            
            </div>
        </div>
    );
}

export default checkAuth (Aboutus);
