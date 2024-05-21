import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCreatePost } from "@/services/mutations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const { mutateAsync: createPost, isPending } = useCreatePost();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() !== "" && post.trim() !== "") {
      try {
        // fungsi firebase buat nambah ke collection "posts"
        await createPost({ title, post });

        navigate("/");
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
      setTitle("");
      setPost("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1>Add post</h1>

      <form
        action=""
        className="flex flex-col w-6/12 space-y-4 "
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

        <Button type="submit" disbled={isPending}>
          {isPending ? "Submiting..." : "Submit"}
        </Button>
      </form>

      <Link to={"/"} className="mt-5">
        <Button className="text-white bg-black hover:bg-gray-600">Back</Button>
      </Link>
    </div>
  );
};

export default AddPost;
