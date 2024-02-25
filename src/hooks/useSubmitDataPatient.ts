import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";
import { TreatmentFormData } from "../types";

const useSubmitDataPatient = () => {
  const [isErrorSubmit, setIsErrorSubmit] = useState<boolean>(false);

  const handleSubmitData = async (data: TreatmentFormData) => {
    try {
      const payload = {
        ...data,
        date: Timestamp.fromDate(data.date),
        name : data?.patientName,
      };

      const dataCollectionRef = collection(db, "patient-data");


      const docRef = await addDoc(dataCollectionRef, payload);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error(error);
      setIsErrorSubmit(true);
    }
  };

  return { handleSubmitData, isErrorSubmit };
};

export default useSubmitDataPatient;
