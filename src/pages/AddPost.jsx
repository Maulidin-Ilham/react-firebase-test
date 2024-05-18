import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() !== "" && post.trim() !== "") {
      try {
        // fungsi firebase buat nambah ke collection "posts"
        const docRef = collection(db, "posts");

        // fungsi buat ngisi di collection post tadi
        await addDoc(docRef, {
          title: title,
          post: post,
        });
        navigate("/");
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
      setTitle("");
      setPost("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>Add post</h1>

      <form
        action=""
        className="flex flex-col space-y-4 w-6/12 "
        onSubmit={submitHandler}
      >
        <div>
          <label htmlFor="">Title</label>
          <Input
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Textarea
            placeholder="post..."
            className="resize-none w-full h-[180px]"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <Link to={"/"} className="mt-5">
        <Button className="bg-black hover:bg-gray-600 text-white">Back</Button>
      </Link>
    </div>
  );
};

export default AddPost;
