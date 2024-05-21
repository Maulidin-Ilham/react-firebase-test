import { useLoginWithGoogle } from "@/services/mutations";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { mutateAsync: loginWithGoogle } = useLoginWithGoogle();

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
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
