import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
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
      console.log("~Token", token);
      console.log("~User", user);

      navigate("/", { replace: true });
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error(credential);
      console.error(error?.message);
    }
  };

  return (
    <main className="max-w-screen-md px-4 mx-auto">
      <section className="my-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>
        <div className="grid place-content-center">
          <div className="flex flex-col items-center justify-center py-8 border shadow-md rounded-md w-[250px]">
            <Button
              type="button"
              onClick={handleLoginWithGoogle}
              className="text-white shadow"
            >
              Login With Google
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
