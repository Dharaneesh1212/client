import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5000/api/v1/auth/signup").then((res) => {
      if (res.data.status) {
        setUser(res.data.user);
      } else {
        navigate("/signin");
      }
    });
  }, [navigate]);

  return (
    <main className="flex items-center justify-center h-[5rem] bg-slate-300">
      <ul className="flex items-center justify-center flex-row gap-8">
        <li>
          <Link
            className="text-xl px-4 py-2 rounded-md bg-sky-400 hover:shadow-[0_5px_10px_rgba(0,0,0,0.35)]"
            to="/"
          >
            Home Page
          </Link>
        </li>
        {/* {user && ( */}
          <li>
            <Link
              className="text-xl px-4 py-2 rounded-md bg-sky-400 hover:shadow-[0_5px_10px_rgba(0,0,0,0.35)]"
              to="/create"
            >
              Create Blog
            </Link>
          </li>
        {/* )} */}
        <li>
          <Link
            className="text-xl px-4 py-2 rounded-md bg-sky-400 hover:shadow-[0_5px_10px_rgba(0,0,0,0.35)]"
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            className="text-xl px-4 py-2 rounded-md bg-sky-400 hover:shadow-[0_5px_10px_rgba(0,0,0,0.35)]"
            to="/signin"
          >
            Sign in
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Navbar;
