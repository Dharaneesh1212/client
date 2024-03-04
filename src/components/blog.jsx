import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/blog");
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/auth/verify",
          {
            withCredentials: true,
          }
        );
        if (response.data.status) {
          setUser(response.data.user);
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/blog/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/create/${id}`);
  };

  // axios.defaults.withCredentials = true;
  const handleLogout = async () => {
    await axios
      .get("http://localhost:5000/api/v1/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/signup");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex items-center justify-center h-fit">
      <div className="flex items-center justify-center m-2 flex-wrap gap-2">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="card flex flex-col gap-4 bg-white p-4 rounded-md m-6 shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-[38rem]"
          >
            <div className="flex justify-between">
              <div>
                <h1 className="p-1 font-mono font-light text-2xl uppercase">
                  <span className="font-bold">Title:</span>
                  {blog.title}
                </h1>
              </div>
              <div>
                <img
                  src={blog.image}
                  alt={blog.title || "Blog Image"}
                  className="max-w-full h-[5rem] w-[10rem] mt-2"
                />
              </div>
            </div>
            <p className="p-1 font-serif text-lg">
              <span className="font-bold text-xl">Blog :</span>{" "}
              {blog.content.slice(0, 500)}
            </p>
            {/* <p className="text-gray-800 p-1 font-sans">
              <span className="font-bold">Published:</span>
              {new Date(blog.datePublished).toLocaleDateString()}
            </p> */}
            {/* <p className="text-gray-800 p-1 font-sans text-xl">
              <span className="font-bold">Author:</span> {blog.author}
            </p> */}
            {/* <img
              src={blog.image}
              alt={blog.title || "Blog Image"}
              className="max-w-full h-[5rem] w-[10rem] mt-2"
            /> */}
            {/* <p className="text-gray-800 mt-2 p-1 font-sans font-medium">
              <span className="font-bold">Tags:</span> {blog.tags.join(", ")}
            </p> */}
            {/* <p className="text-gray-800 mt-2 p-1 font-sans flex items-center gap-1">
              <span className="font-bold">
                <FaHeart />
              </span>
              {blog.likes}
            </p> */}
            <div className="flex items-center justify-evenly">
              <button
                onClick={() => handleEditClick(blog._id)}
                className="bg-green-500 text-xl px-4 py-1 rounded-md hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-500 text-xl px-4 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="bg-teal-500 text-xl px-4 py-1 rounded-md hover:bg-teal-600"
              >
                view more
              </Link>
            </div>
          </div>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center h-10 w-[10rem] bg-red-500 rounded-md font-mono font-medium text-xl"
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Blogs;
