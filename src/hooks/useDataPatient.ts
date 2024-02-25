import { useEffect, useState } from "react";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { TreatmentFormData } from "../types";
import { db } from "../config/firebase";

const useDataPatient = () => {
  const [listData, setListData] = useState<TreatmentFormData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dataCollectionRef = collection(db, "patient-data");

  useEffect(() => {
    const getListData = async () => {
      try {
        setIsLoading(true);
        const data = await getDocs(dataCollectionRef);
        const mappingData = data.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          date: new Date(doc.data().date.toDate()),
          patientName: doc.data().name,
        })) as TreatmentFormData[];
        console.log("mappingData", mappingData);
        setListData(mappingData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getListData();
  }, []);

  console.log(listData);
  
  return { listData, isLoading };
};

export default useDataPatient;
