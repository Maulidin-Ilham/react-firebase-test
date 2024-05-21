import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth, db } from "@/firebase-config";

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

export const googleLogin = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();

    googleProvider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const token = credential.accessToken;

    const user = {
      name: result.user.displayName,
      email: result.user.email,
      avatar: result.user.photoURL,
    };

    return {
      token,
      user,
    };
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error(credential);

    throw new Error(error);
  }
};
