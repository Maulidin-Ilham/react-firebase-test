import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

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

    if (!title || !post) return;

    await createPost(
      { title, post },
      {
        onSettled: () => {
          navigate("/");

          setTitle("");
          setPost("");
        },
      }
    );
  };

  return (
    <section className="max-w-screen-md px-4 mx-auto my-6">
      <div className="mb-3">
        <Button size="icon" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-5 h-5 text-white" />
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-center">Add post</h2>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title..."
          />
        </div>
        <div>
          <label htmlFor="post">Post</label>
          <Textarea
            id="post"
            name="post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="post..."
            className="resize-none w-full h-[180px]"
          />
        </div>

        <Button type="submit">{isPending ? "Submiting..." : "Submit"}</Button>
      </form>
    </section>
  );
};

export default AddPost;
