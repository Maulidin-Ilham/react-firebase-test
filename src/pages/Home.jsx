import { useEffect } from "react";
import { db } from "../firebase-config";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      // ambil collection post
      const postRef = collection(db, "posts");

      // fungsi buat ambil data collection post dan biar bisa di map (udah bawaan)
      const snapshot = await getDocs(postRef);
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPost(postList);
    };

    getPosts();
  }, [posts]);

  const deleteHandler = async (id) => {
    try {
      // ambil single data di post berdasarkan id
      const postDoc = doc(db, "posts", id);

      // fungsi bawaan firestore buat delete berdasarkan id
      await deleteDoc(postDoc);
    } catch (error) {
      console.log("error");
    }
  };

  const editHandler = async (id) => {
    try {
      // ambil single data di post berdasarkan id
      const postDoc = doc(db, "posts", id);

      // fungsi bawaan firestore buat update berdasarkan id
      await updateDoc(postDoc, {
        title: "title baru statis",
        post: "post baru statis",
      });
    } catch (error) {
      console.error(error);
    }
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
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="shadow-lg mt-4 p-3 rounded ">
              <h1>Title: {post.title}</h1>
              <h1>Post: {post.post}</h1>

              <div className="flex flex-row space-x-3 mt-2">
                <Button
                  className="bg-accent"
                  onClick={() => editHandler(post.id)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-destructive"
                  onClick={() => deleteHandler(post.id)}
                >
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
        {posts.length <= 0 ? (
          <>
            <h1>No post yes</h1>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
