import { Link, useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

import { usePosts } from "@/services/queries";
import { useDeletePost, useUpdatePost } from "@/services/mutations";

import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  // ini untuk ngecek udah login apa blm
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { data: posts, isLoading, isSuccess, isError, error } = usePosts();
  const { mutate: deletePost, isPending: isPendingDeletePost } =
    useDeletePost();
  const { mutate: updatePost, isPending: isPendingUpdatePost } =
    useUpdatePost();

  const deleteHandler = (postId) => {
    deletePost(postId);
  };

  const editHandler = (postId) => {
    const newData = {
      title: "Update data",
      post: "Ini post yang udah di update datanya cuy",
    };

    updatePost({ postId, data: newData });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const loginHandler = () => {
    navigate("/login");
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isSuccess) {
    content = (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 space-y-3 border rounded-md shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold">Title: {post.title}</h2>
                <p>Post: {post.post}</p>
                <p className="text-gray-500">Author: {post.author_name}</p>
              </div>

              <div className="flex flex-row gap-3 ">
                {currentUser && (
                  <>
                    <Button
                      className="bg-accent"
                      onClick={() => editHandler(post.id)}
                    >
                      {isPendingUpdatePost ? "Editing..." : "Edit"}
                    </Button>
                    <Button
                      className="bg-destructive"
                      onClick={() => deleteHandler(post.id)}
                    >
                      {isPendingDeletePost ? "Deleting..." : "Delete"}
                    </Button>
                  </>
                )}
                <Link to={`${post.id}`}>
                  <Button className="bg-primary" onClick={deleteHandler}>
                    Detail
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>
            <i>No posts found</i>
          </p>
        )}
      </div>
    );
  }

  if (isError) {
    content = <div>Error: {error.message}</div>;
  }

  return (
    <section className="max-w-screen-md px-4 mx-auto my-6">
      <h1>Post </h1>
      {currentUser == null ? (
        <>
          <h1>Anda blm login</h1>
          <Button onClick={loginHandler}>Login</Button>
        </>
      ) : (
        <>
          <h1>Hello {currentUser.displayName}</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
      <div className="my-3">
        <Link to={"/add-post"}>
          <Button>Add post</Button>
        </Link>
      </div>
      {content}
    </section>
  );
};

export default Home;
