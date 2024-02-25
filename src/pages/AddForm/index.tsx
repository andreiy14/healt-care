import { useState } from "react";
import { Navbar, FormPatient, HistorySubmit } from "../../components";
import { useDataPatient, useSubmitDataPatient } from "../../hooks";

type Props = {};

const AddForm = (props: Props) => {
  const { handleSubmitData, isErrorSubmit, isSuccessSubmit, contextHolder } =
    useSubmitDataPatient();

  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
  const handleOpenHistory = () => setIsOpenHistory(!isOpenHistory); // to handle mobile view
  const { listData } = useDataPatient({ isSuccessSubmit });

  return (
    <div className="relative min-h-screen">
      {contextHolder}
      <main>
        <Navbar />
        <div className="flex items-start justify-start md:flex md:mt-10 w-full md:justify-between">
          <HistorySubmit
            listData={listData}
            handleOpenForm={handleOpenHistory}
            isShow={isOpenHistory}
          />
          {!isOpenHistory ? (
            <FormPatient
              handleOpenHistory={handleOpenHistory}
              handleSubmitData={handleSubmitData}
              isErrorSubmit={isErrorSubmit}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default AddForm;
