import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      "http://localhost:5000/api/v1/auth/signin",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.status) {
          navigate("/create");
        }
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex items-center justify-center h-fit bg-white m-6">
      <div className="flex items-center justify-evenly flex-row bg-white h-[30rem] w-[28rem] rounded-3xl shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col gap-10 w-[25rem]"
          >
            <h1 className="text-2xl font-semibold font-mono">Sign In</h1>
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
            <button className="flex items-center justify-center h-10 w-[10rem] bg-fuchsia-500 rounded-md font-sans font-medium text-lg">
              Sign In
            </button>
            <Link to="/forgotPassword">Forgot password?</Link>
            <p className="flex items-center justify-center text-xl">
              Don't have an account? <Link to="/signup">Signup</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
