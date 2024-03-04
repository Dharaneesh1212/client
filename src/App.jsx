import Blogs from "./components/blog";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateBlog from "./components/createBlog";
import Signup from "./components/signup";
import Signin from "./components/signin.jsx";
import FullBlog from "./components/fullBlog.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx"
import ResetPassword from "./components/ResetPassword.jsx";

const App = () => {
  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/create/:id?" element={<CreateBlog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/blog/:blogId" element={<FullBlog />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
