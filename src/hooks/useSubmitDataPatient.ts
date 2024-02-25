import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";
import { TreatmentFormData } from "../types";
import { message } from "antd";

const useSubmitDataPatient = () => {
  const [isErrorSubmit, setIsErrorSubmit] = useState<boolean>(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const successSubmit = () => {
    messageApi.open({
      type: "success",
      content: "Successfully submitted",
    });
  };
  const errorSubmit = () => {
    messageApi.open({
      type: "error",
      content: "Error submit data",
    });
  };

  const handleSubmitData = async (data: TreatmentFormData) => {
    try {
      const payload = {
        ...data,
        date: Timestamp.fromDate(data.date),
        name: data?.patientName,
      };

      const dataCollectionRef = collection(db, "patient-data");

      const docRef = await addDoc(dataCollectionRef, payload);
      if (docRef?.id) {
        setIsSuccessSubmit(docRef.id);
        successSubmit();
      }
    } catch (error) {
      errorSubmit();

      setIsErrorSubmit(false);
    }
  };

  return { handleSubmitData, isErrorSubmit, isSuccessSubmit, contextHolder };
};

export default useSubmitDataPatient;
