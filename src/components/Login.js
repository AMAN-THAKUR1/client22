"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios"

function Login({ setdisplogin, setforce }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const sendInfo = () => {
    
      axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      }).then(response =>{
        const token = response.data.token;
        localStorage.setItem("token",token)
        setdisplogin(false);        
      }).catch(error => {
        console.error('Login failed:', error);
      })

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setError({
      email: "",
      password: "",
    });

  
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    }

  
    if (!password || password.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long.",
      }));
    }

  
    if (email && password.length >= 6 && !error.email && !error.password) {

      sendInfo();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className={`max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 transition-all duration-500`}
    >
      <article className={`grid gap-8 `}>
        <section className="flex flex-col">
          <header className="flex flex-col sm:flex-row items-center">
            <h2 className="font-semibold text-black text-lg m-auto">
              Log In
                  </h2>
          </header>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className={`flex justify-center`}>
                <Image
                  src="/Login.jpg"
                  alt="Logo"
                  width={300}
                  height={200}
                />
              </div>

              <div className="w-full mb-3">
                <label
                  className="font-bold text-[18px] text-gray-600 py-2"
                  htmlFor="email"
                >
                  Email
                        <abbr title="required">*</abbr>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-lg outline-none"
                />
                {error.email && (
                  <p className="text-red-500 text-xs">{error.email}</p>
                )}
              </div>

              <div className="w-full mb-3">
                <label
                  className="font-bold text-[18px] text-gray-600 py-2"
                  htmlFor="password"
                >
                  Password
                        <abbr title="required">*</abbr>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-lg outline-none"
                />
                {error.password && (
                  <p className="text-red-500 text-xs">{error.password}</p>
                )}
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setdisplogin(false);
                    setforce(true);
                  }}
                  type="reset"
                  className="bg-white border-[#5ae3aa] border-[1px] px-5 py-2 transition-all duration-500 text-sm shadow-sm font-medium text-gray-600 rounded-full hover:bg-green-400 hover:border-green-400"
                >
                  New user? Sign up
                      </button>
                <button
                  type="submit"
                  className="bg-[#5ae3aa] px-5 py-2 text-sm shadow-sm transition-all duration-300 font-medium text-white rounded-full hover:bg-[#5ae377]"
                >
                  Submit
                      </button>
              </div>
            </form>
          </div>
        </section>
      </article>
    </div>
  );
}

export default Login;