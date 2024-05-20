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
      // ambil post berdasarkan id nya
      const postRef = doc(db, "posts", postId);

      // disini karena hanya 1 data yang diambil makanya pake getDoc ( gk pake s)
      const postSnap = await getDoc(postRef);

      // ini set post
      setPost({ id: postSnap.id, ...postSnap.data() });

      // ini artinya ambil collection comment di sebuah post
      const commentsRef = collection(db, "posts", postId, "comments");

      // trs kita ambil semua data collectionnya makanya pake getDocs pake s, beda sama yang berdasarkan id tadi
      const commentsSnap = await getDocs(commentsRef);

      // exist disini buat ngecek, apakah ada comment atau tidak, jika ada ya lakukan seperti biasa ini
      if (commentsSnap.exists()) {
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
    // ini artinya misalnya user ngisi input kosongan (cuma spasi) itu gk dihitung
    if (newComment.trim() !== "") {
      try {
        // seperti biasa dia ambil collection comments
        // cara bacanya -> dari db ambil collection post -> dari situ ambil id post -> setelah itu ambil collection comment nya
        const commentRef = collection(db, "posts", postId, "comments");

        // fungsi nambah ke collection comments
        await addDoc(commentRef, { comment: newComment });

        // ini ambil semua comments
        const commentsSnap = await getDocs(commentRef);

        // ini update comment karena ada comment baru
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
