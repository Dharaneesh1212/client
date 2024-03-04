import { useContext, useEffect, useReducer, createContext } from "react";
import blogReducer from "./blogReducer";
import axios from "axios";

const Blog = createContext();

const addBlog = async (newBlog, dispatch) => {
  try {
    const response = await axios.post(
      "https://mushy-dress-bull.cyclic.app/api/v1/blog",
      newBlog
    ); 
    dispatch({ type: "ADD_BLOG", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const Blogcontext = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, []);

  useEffect(() => {
    axios.get("https://mushy-dress-bull.cyclic.app/api/v1/blog").then((res) => {
      dispatch({ type: "FETCH_INIT", payload: res.data });
    });
  }, []);

  console.log(state);

  return <Blog.Provider value={{ state, dispatch }}>{children}</Blog.Provider>;
};

export const BlogState = () => {
  return useContext(Blog);
};

export default Blogcontext;
