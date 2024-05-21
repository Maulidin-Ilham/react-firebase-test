import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase-config";

export const getAllPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const postsSnapshot = await getDocs(postsRef);
    return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error);
  }
};

export const getPost = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);

    const postSnapshot = await getDoc(postRef);

    if (!postSnapshot.exists) {
      return null;
    }

    const commentsRef = collection(db, "posts", postId, "comments");

    const commentsSnapshot = await getDocs(commentsRef);

    const comments = commentsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return {
      post: { id: postSnapshot.id, ...postSnapshot.data() },
      comments,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (data) => {
  try {
    const postRef = collection(db, "posts");

    await addDoc(postRef, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePost = async ({ postId, data }) => {
  try {
    const postRef = doc(db, "posts", postId);

    const postSnapshot = await getDoc(postRef);

    if (!postSnapshot.exists) {
      return;
    }

    await updateDoc(postRef, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);

    const postSnapshot = await getDoc(postRef);

    if (!postSnapshot.exists) {
      return;
    }

    await deleteDoc(postRef);
  } catch (error) {
    throw new Error(error);
  }
};

export const createCommentPost = async ({ postId, comment }) => {
  try {
    const commentRef = collection(db, "posts", postId, "comments");
    await addDoc(commentRef, { comment });
  } catch (error) {
    throw new Error(error);
  }
};
