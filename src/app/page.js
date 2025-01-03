"use client"
import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Booking from "../app/register/page";
import Signup from "../components/Signup";

function page() {
  const [token, settoken] = useState(localStorage.getItem("token") || "");
  const [logged, setlogged] = useState(false);
  const [force, setforce] = useState(false);
  const [displogin, setdisplogin] = useState(true);

  useEffect(() => {
    
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      settoken(storedToken);
      setdisplogin(false); 
    } else {
      settoken("");
      setdisplogin(true); 
    }

  }, [displogin]); 

  useEffect(() => {
    setdisplogin(false);
  }, [force])

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      {force && (
        <Signup
          logged={logged}
          setlogged={setlogged}
          setforce={setforce}
          setdisplogin={setdisplogin}
        />
      )}
      {(displogin ) && (
        <Login
          setdisplogin={setdisplogin}
          setforce={setforce}
        />
      )}
      {token && (
        <Booking
          setdisplogin={setdisplogin}
          setforce={setforce}
        />
      )}
    </div>
  );
}

export default page;
