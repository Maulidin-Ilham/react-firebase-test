import { useEffect } from "react";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const postRef = collection(db, "posts");
      const snapshot = await getDocs(postRef);
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPost(postList);
    };

    getPosts();
  }, []);
  return (
    <div className=" flex justify-center items-center flex-col">
      <h1>Post</h1>
      <div className="flex flex-col space-y-4 ">
        {posts.map((post) => (
          <Link
            to={`/${post.id}`}
            key={post.id}
            className="shadow-lg mt-4 p-3 rounded hover:cursor-pointer"
          >
            <h1>Title: {post.title}</h1>
            <h1>Post: {post.post}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
