import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createKalkulatorInvestasi } from "@/services/api";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const KalkulatorInvestasi = () => {
  const [uang1, setUang1] = useState("");
  const [uang2, setUang2] = useState("");
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const author_name = currentUser?.displayName;
    const author_id = currentUser?.uid;
    await createKalkulatorInvestasi({ uang1, uang2, author_name, author_id });
    setUang1("");
    setUang2("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Kalkulator investasi</h1>

      <form
        className="mt-3 flex flex-col space-y-3 w-2/3 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Input
          type="number"
          placeholder="uang 1..."
          value={uang1}
          onChange={(e) => setUang1(e.target.value)}
        />
        <Input
          type="number"
          placeholder="uang 2..."
          value={uang2}
          onChange={(e) => setUang2(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default KalkulatorInvestasi;
