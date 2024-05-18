import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { Button } from "@/components/ui/button";

const DetailPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPost({ id: postSnap.id, ...postSnap.data() });

        const commentsRef = collection(db, "posts", postId, "comments");
        const commentsSnap = await getDocs(commentsRef);
        const commentsList = commentsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsList);
      } else {
        return null;
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const commentRef = collection(db, "posts", postId, "comments");
        await addDoc(commentRef, { comment: newComment });

        const commentsSnap = await getDocs(commentRef);
        const updatedComments = commentsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(updatedComments);

        setNewComment("");
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Detail post: {postId}</h1>
      <h1>Title: {post.title}</h1>
      <h1>Post: {post.post}</h1>

      <div className="mt-5">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="p-2 border border-gray-400 rounded"
        />
        <button
          onClick={handleAddComment}
          className="p-2 bg-blue-500 text-white ml-2 rounded"
        >
          Add Comment
        </button>
      </div>

      <div className="mt-5">
        <h1>Comment</h1>
        <ul>
          {comments &&
            comments.map((comment) => (
              <li key={comment.id} className="border p-2 mt-2 rounded">
                <p>{comment.comment}</p>
              </li>
            ))}
          {comments.length === 0 ? (
            <>
              <h1>No comments found</h1>
            </>
          ) : null}
        </ul>
      </div>

      <Link to={"/"} className="mt-3">
        <Button className="">Back</Button>
      </Link>
    </div>
  );
};

export default DetailPost;
