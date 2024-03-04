import React, { useState } from "react";
import Axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const {token} = useParams()

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      "https://mushy-dress-bull.cyclic.app/api/v1/auth/reset-password/"+token,
      {
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
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className="flex items-center justify-center h-fit bg-white m-6">
      <div className="flex items-center justify-evenly flex-row bg-white h-[25rem] w-[25rem] rounded-3xl shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col gap-8 w-[25rem]"
          >
            <h1 className="text-2xl font-semibold font-mono">Reset Password</h1>
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <button className="flex items-center justify-center h-10 w-[10rem] bg-purple-500 rounded-md font-sans font-medium text-lg">
              Reset
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
