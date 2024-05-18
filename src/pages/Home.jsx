import { useEffect } from "react";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  const deleteHandler = () => {
    console.log("delete");
  };

  const editHandler = () => {
    console.log("edit");
  };
  return (
    <div className=" flex justify-center items-center flex-col">
      <h1>Post </h1>
      <div className="my-3">
        <Link to={"/add-post"}>
          <Button>Add post</Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-4 w-[400px]">
        {posts.map((post) => (
          <div key={post.id} className="shadow-lg mt-4 p-3 rounded ">
            <h1>Title: {post.title}</h1>
            <h1>Post: {post.post}</h1>

            <div className="flex flex-row space-x-3 mt-2">
              <Button className="bg-accent" onClick={editHandler}>
                Edit
              </Button>
              <Button className="bg-destructive" onClick={deleteHandler}>
                Delete
              </Button>
              <Link to={`${post.id}`}>
                <Button className="bg-primary" onClick={deleteHandler}>
                  Detail
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
