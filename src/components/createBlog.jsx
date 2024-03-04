import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";

const CreateBlog = () => {
  const { id } = useParams();
  const initialValues = {
    title: "",
    content: "",
    datePublished: "",
    author: "",
    tags: [],
    comment: "",
    image: "",
    likes: 0,
  };
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://mushy-dress-bull.cyclic.app/api/v1/blog/${id}`
          );
          setFormData(response.data.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError("Error fetching post data");
        }
      };
      fetchPost();
    }
  }, [id]);

  const fileInputRef = useRef(null);

  const setBlogContent = (e) => {
    setFormData((prev) => {
      switch (e.target.name) {
        case "tags":
          return {
            ...prev,
            [e.target.name]: e.target.value.split(",").map((tag) => tag.trim()),
          };

        case "datePublished":
        case "image":
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };

        default:
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
      }
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);
  //     const method = id ? "put" : "post";
  //     const url = id
  //       ? `https://mushy-dress-bull.cyclic.app/api/v1/blog/${id}`
  //       : "https://mushy-dress-bull.cyclic.app/api/v1/blog";

  //     const response = await axios[method](url, formData);
  //     console.log(response.data);
  //     setLoading(false);
  //     setFormData(initialValues);
  //     navigate("/");
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error:", error);
  //     if (error.response) {
  //       setError(error.response.data.message);
  //     } else if (error.request) {
  //       setError("No response received from the server");
  //     } else {
  //       setError(error.message);
  //     }
  //   }
  // };

  ////
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const method = id ? "put" : "post";
      const url = id
        ? `https://mushy-dress-bull.cyclic.app/api/v1/blog/${id}`
        : "https://mushy-dress-bull.cyclic.app/api/v1/blog";

      const response = await axios[method](url, formData, {
        withCredentials: true,
      });
      console.log(response.data); // Log the response from the backend if needed
      setLoading(false);
      setFormData(initialValues);
      navigate("/"); // Navigate to the desired location after successful submission
    } catch (error) {
      setLoading(false);
      console.error("Error:", error); // Log detailed error message
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response received from the server");
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("https://mushy-dress-bull.cyclic.app/api/v1/auth/verify").then((res) => {
      if (res.data.status) {
      } else {
        navigate("/");
      }
      console.log(res.data.user);
    });
  }, []);

  return (
    <main className="flex items-center justify-center h-fit">
      <form
        className="flex justify-center items-center flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="flex items-center justify-center font-mono font-light text-2xl uppercase">
          Every field should be filled
        </h1>
        <p>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={setBlogContent}
            className="h-[3.5rem] w-[30rem] p-1 font-mono font-light text-2xl uppercase border-2 border-black rounded-md"
          />
        </p>
        <p>
          <textarea
            name="content"
            placeholder="Enter blog"
            value={formData.content}
            onChange={setBlogContent}
            className="p-1 font-serif w-[30rem] h-[15rem] text-lg border-2 border-black rounded-md"
          ></textarea>
        </p>
        <p>
          <input
            type="text"
            name="author"
            placeholder="Enter author name"
            value={formData.author}
            onChange={setBlogContent}
            className="h-[3.5rem] w-[30rem] p-1 font-sans text-xl border-2 border-black rounded-md"
          />
        </p>
        <p>
          <input
            type="date"
            name="datePublished"
            value={formData.datePublished}
            onChange={setBlogContent}
            className="h-[3.5rem] w-[30rem] p-1 font-sans border-2 border-black rounded-md"
          />
        </p>
        <p>
          <input
            type="text"
            name="tags"
            placeholder="Enter tags #code,#js"
            value={formData.tags}
            onChange={setBlogContent}
            className="h-[3.5rem] w-[30rem] p-1 font-sans font-medium border-2 border-black rounded-md"
          />
        </p>
        <p>
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 rounded-md mb-2 border border-gray-300"
            />
          )}
          <FileBase64
            type="file"
            name="image"
            id="image"
            accept="image/*"
            ref={fileInputRef}
            onDone={({ base64 }) => {
              setFormData({ ...formData, image: base64 });
            }}
          />
        </p>
        {/* <p>
          <input
            type="number"
            name="likes"
            placeholder="Enter likes"
            value={formData.likes}
            onChange={setBlogContent}
            className="h-[2.5rem] w-[18rem] p-1 font-sans border-2 border-black rounded-md"
          />
        </p> */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            className="bg-green-500 text-xl px-4 py-2 rounded-md"
          >
            {id ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => setFormData(initialValues)}
            className="bg-red-500 text-xl px-4 py-2 rounded-md"
          >
            Clear
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateBlog;

////

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import FileBase64 from "react-file-base64";

// const CreateBlog = () => {
//   const { id } = useParams();
//   const initialValues = {
//     title: "",
//     content: "",
//     datePublished: "",
//     author: "",
//     tags: "",
//     comment: "",
//     image: "",
//     likes: 0,
//   };
//   const [formData, setFormData] = useState(initialValues);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch post data if editing an existing post
//     if (id) {
//       const fetchPost = async () => {
//         try {
//           setLoading(true);
//           const response = await axios.get(
//             `https://mushy-dress-bull.cyclic.app/api/v1/blog/${id}`
//           );
//           setFormData(response.data.data);
//           setLoading(false);
//         } catch (error) {
//           setLoading(false);
//           setError("Error fetching post data");
//         }
//       };
//       fetchPost();
//     }
//   }, [id]);

//   const setBlogContent = (e) => {
//     setFormData((prev) => {
//       switch (e.target.name) {
//         case "tags":
//           return {
//             ...prev,
//             [e.target.name]: e.target.value.split(",").map((tag) => tag.trim()),
//           };

//         case "datePublished":
//         case "image":
//           return {
//             ...prev,
//             [e.target.name]: e.target.value,
//           };

//         default:
//           return {
//             ...prev,
//             [e.target.name]: e.target.value,
//           };
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const method = id ? "put" : "post";
//       const url = id
//         ? `https://mushy-dress-bull.cyclic.app/api/v1/blog/${id}`
//         : "https://mushy-dress-bull.cyclic.app/api/v1/blog";

//       const response = await axios[method](url, formData);
//       console.log(response.data); // Log the response from the backend if needed
//       setLoading(false);
//       setFormData(initialValues);
//       navigate("/"); // Navigate to the desired location after successful submission
//     } catch (error) {
//       setLoading(false);
//       console.error("Error:", error); // Log detailed error message
//       if (error.response) {
//         setError(error.response.data.message);
//       } else if (error.request) {
//         setError("No response received from the server");
//       } else {
//         setError(error.message);
//       }
//     }
//   };

//   return (
//     <main className="flex items-center justify-center h-fit">
//       <form className="flex justify-center flex-col gap-6" onSubmit={handleSubmit}>
//         <h1 className="font-mono font-light text-2xl uppercase">Every field should be filled</h1>
//         <p>
//           <input
//             type="text"
//             name="title"
//             placeholder="Enter title"
//             value={formData.title}
//             onChange={setBlogContent}
//             className="h-[2.5rem] w-[18rem] p-1 font-mono font-light text-2xl uppercase border-2 border-black rounded-md"
//           />
//         </p>
//         <p>
//           <textarea
//             name="content"
//             placeholder="Enter blog"
//             value={formData.content}
//             onChange={setBlogContent}
//             className="p-1 font-serif w-[18rem] text-lg border-2 border-black rounded-md"
//           ></textarea>
//         </p>
//         <p>
//           <input
//             type="text"
//             name="author"
//             placeholder="Enter author name"
//             value={formData.author}
//             onChange={setBlogContent}
//             className="h-[2.5rem] w-[18rem] p-1 font-sans text-xl border-2 border-black rounded-md"
//           />
//         </p>
//         <p>
//           <input
//             type="date"
//             name="datePublished"
//             value={formData.datePublished}
//             onChange={setBlogContent}
//             className="h-[2.5rem] w-[18rem] p-1 font-sans border-2 border-black rounded-md"
//           />
//         </p>
//         <p>
//           <input
//             type="text"
//             name="tags"
//             placeholder="Enter tags #code,#js"
//             value={formData.tags}
//             onChange={setBlogContent}
//             className="h-[2.5rem] w-[18rem] p-1 font-sans font-medium border-2 border-black rounded-md"
//           />
//         </p>
//         <p>
//           <FileBase64
//             type="file"
//             name="image"
//             value={formData.image}
//             onDone={({ base64 }) => {
//               console.log(base64);
//               setBlogContent((prev) => ({
//                 ...prev,
//                 image: base64,
//               }));
//             }}
//             onChange={setBlogContent}
//           />
//         </p>
//         {/* <p>
//           <input
//             type="number"
//             name="likes"
//             placeholder="Enter likes"
//             value={formData.likes}
//             onChange={setBlogContent}
//             className="h-[2.5rem] w-[18rem] p-1 font-sans border-2 border-black rounded-md"
//           />
//         </p> */}
//         <div className="flex items-center justify-center gap-4">
//           <button
//             type="submit"
//             className="bg-green-500 text-xl px-4 py-2 rounded-md"
//           >
//             {id ? "Update" : "Create"}
//           </button>
//           <button
//             type="button"
//             onClick={() => setFormData(initialValues)}
//             className="bg-red-500 text-xl px-4 py-2 rounded-md"
//           >
//             Clear
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default CreateBlog;
