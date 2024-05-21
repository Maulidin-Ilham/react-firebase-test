import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import { usePost } from "@/services/queries";
import { useCreateCommentPost } from "@/services/mutations";

import { Button } from "@/components/ui/button";

const DetailPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const { data, isLoading, isSuccess, isError, error } = usePost(postId);
  const { mutateAsync: createCommentPost, isPending } = useCreateCommentPost();

  const handleCommentPost = async () => {
    await createCommentPost(
      { postId, comment },
      {
        onSettled: () => {
          setComment("");
        },
      }
    );
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isSuccess) {
    content = (
      <div>
        <div className="mb-3">
          <Button size="icon" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-5 h-5 text-white" />
          </Button>
        </div>

        <div>
          <h1>Detail post: {postId}</h1>
          <h1>Title: {data?.post.title}</h1>
          <h1>Post: {data?.post.post}</h1>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="p-2 border border-gray-400 rounded"
          />
          <Button type="button" onClick={handleCommentPost}>
            {isPending ? "Loading..." : "Add comment"}
          </Button>
        </div>

        <div className="mt-5">
          <h1>Comment {data.comments.length}</h1>
          <ul>
            {data?.comments.length > 0 ? (
              data?.comments.map((comment) => (
                <li key={comment.id} className="p-2 mt-2 border rounded">
                  <p>{comment.comment}</p>
                </li>
              ))
            ) : (
              <i>No comments found</i>
            )}
          </ul>
        </div>
      </div>
    );
  }

  if (isError) {
    content = <div>Error: {error.message}</div>;
  }

  return (
    <section className="max-w-screen-md px-4 mx-auto my-8">{content}</section>
  );
};

export default DetailPost;
