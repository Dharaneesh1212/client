import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const FullBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/blog/${blogId}`
        );
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const Delete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/blog/${id}`);
      setBlog(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleEditClick = (id) => {
    navigate(`/create/${id}`);
  };

  return (
    <main className="flex items-center justify-center h-fit">
      <div className="flex flex-col gap-4 bg-white p-4 rounded-md m-6 shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-fit">
        <h1 className="p-1 font-mono font-light text-2xl uppercase">
          <span className="font-bold">Title:</span>
          {blog.title}
        </h1>
        <p className="p-1 font-serif text-lg">
          <span className="font-bold">Blog :</span>
          {blog.content}
        </p>
        <p className="text-gray-800 p-1 font-sans">
          <span className="font-bold">Published:</span>
          {new Date(blog.datePublished).toLocaleDateString()}
        </p>
        <p className="text-gray-800 p-1 font-sans text-xl">
          <span className="font-bold">Author:</span> {blog.author}
        </p>
        <img
          src={blog.image}
          alt={blog.title || "Blog Image"}
          className="max-w-full h-auto mt-2"
        />
        <p className="text-gray-800 mt-2 p-1 font-sans font-medium">
          <span className="font-bold">Tags:</span> {blog.tags.join(", ")}
        </p>
        <div className="flex items-center justify-evenly">
          <button
            onClick={() => handleEditClick(blog._id)}
            className="bg-green-500 text-xl px-4 py-1 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => Delete(blog._id)}
            className="bg-red-500 text-xl px-4 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
};

export default FullBlog;
