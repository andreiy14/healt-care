import { useEffect, useState } from "react";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { TreatmentFormData } from "../types";
import { db } from "../config/firebase";
interface MappedData {
  patientID: string;
}

type Props = {
  isSuccessSubmit?: string;
  patientId?: string;
};
const useDataPatient = ({ isSuccessSubmit = "", patientId = "" }: Props) => {
  const [listData, setListData] = useState<TreatmentFormData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dataCollectionRef = collection(db, "patient-data");
  const getListData = async () => {
    try {
      setIsLoading(true);
      const filterCondition = (item: MappedData) =>
        patientId ? item?.patientID === patientId : true;
      const data = await getDocs(dataCollectionRef);
      const mappingData = data.docs
        .map((doc: DocumentData) => ({
          ...doc.data(),
          date: new Date(doc.data().date.toDate()),
          patientName: doc.data().name,
        }))
        .filter(filterCondition);

      setListData(mappingData);
    } catch (error) {
      console.log("ERROR GET DATA", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  useEffect(() => {
    if (isSuccessSubmit !== "") {
      getListData();
    }
  }, [isSuccessSubmit]);

  return { listData, isLoading, getListData };
};

export default useDataPatient;
