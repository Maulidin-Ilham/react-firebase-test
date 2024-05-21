import { getAuth } from "firebase/auth";
import { db } from "@/firebase-config";
import { Button } from "@/components/ui/button";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
const Riwayat = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [kalkulatorInvestasi, setKalkulatorInvestasi] = useState([]);
  const [kalkulatorY, setKalkulatorY] = useState([]);

  const handlerRiwayat = async () => {
    const kalkulatorInvestasiQuery = query(
      collection(db, "kalkulator_investasi"),
      where("author_id", "==", currentUser?.uid)
    );
    const kalkulatorYQuery = query(
      collection(db, "kalkulator_y"),
      where("author_id", "==", currentUser?.uid)
    );

    const kalkulatorInvestasiSnapshot = await getDocs(kalkulatorInvestasiQuery);
    const kalkulatorInvestasiData = kalkulatorInvestasiSnapshot.docs.map(
      (doc) => ({
        ...doc.data(),
        id: doc.id,
      })
    );

    const kalkulatorYSnapshot = await getDocs(kalkulatorYQuery);
    const kalkulatorYData = kalkulatorYSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setKalkulatorInvestasi(kalkulatorInvestasiData);
    setKalkulatorY(kalkulatorYData);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Riwayat user : {currentUser?.displayName}</h1>
      <Button onClick={handlerRiwayat}>Get riwayat</Button>
      <h1>Kalkulator Investasi </h1>
      <div className="flex flex-col space-y-4">
        {kalkulatorInvestasi.length > 0 &&
          kalkulatorInvestasi.map((data, i) => (
            <div key={data.id} className="flex flex-col space-x-3 ">
              <h1>Riwayat hitungan ke:{i + 1}</h1>
              <h1>Uang 1: {data.uang1}</h1>
              <h1>Uang 2: {data.uang2}</h1>
            </div>
          ))}
      </div>

      <h1 className="mt-10">Kalkulator Y </h1>
      <div className="flex flex-col space-y-4">
        {kalkulatorY.length > 0 &&
          kalkulatorY.map((data, i) => (
            <div key={data.id} className="flex flex-col space-x-3 ">
              <h1>Riwayat hitungan ke:{i + 1}</h1>
              <h1>Uang 1: {data.uang1}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Riwayat;
