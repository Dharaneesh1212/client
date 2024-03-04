import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:5000/api/v1/auth/signup",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.status) {
          navigate("/signin");
        }
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex items-center justify-center h-fit bg-white m-6">
      <div className="flex items-center justify-evenly flex-row bg-white h-[30rem] w-[35rem] rounded-3xl shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-center">
          <form
            className="flex items-center justify-center flex-col gap-8 w-[25rem]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-semibold font-mono">Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              className="h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <button className="flex items-center justify-center h-10 w-[10rem] bg-purple-500 rounded-md font-sans font-medium text-lg">
              Sign Up
            </button>
            <p className="flex items-center justify-center text-xl">Have an account? <Link to="/signin"> Signin</Link> </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
