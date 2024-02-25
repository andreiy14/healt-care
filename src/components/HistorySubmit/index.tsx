import { Button, Input } from "antd";
import { TreatmentFormData } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
type Props = {
  isShow?: boolean;
  handleOpenForm: () => void;
  listData: TreatmentFormData[];
};

const { Search } = Input;
const HistorySubmit = ({ isShow = false, handleOpenForm, listData }: Props) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const handleClick = (patientId: string) => {
    navigate(`detail-patient/${patientId}`); // Navigate to the "/about" route
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterData = (listData: TreatmentFormData[]) => {
    if (!search.trim()) return listData; // Return original list if search is empty

    return listData.reduce(
      (acc: TreatmentFormData[], item: TreatmentFormData) => {
        if (
          item.patientName.toLowerCase().includes(search.toLocaleLowerCase()) ||
          item.patientID.includes(search)
        ) {
          acc.push({ ...item });
        }
        return acc;
      },
      []
    );
  };

  return (
    <div
      className={`${
        isShow ? "flex flex-col justify-center w-full min-h-[400px] " : "hidden"
      }  md:min-h-[500px]   md:flex md:visible px-2.5 pt-10 md:px-20`}
    >
      {isShow && (
        <Button onClick={handleOpenForm} className="w-[150px]">
          Back to Form
        </Button>
      )}

      <div className="bg-white pt-4 flex flex-col items-start justify-start gap-2  rounded-md py-1 shadow-md px-2">
        <h1 className="text-sm font-bold">History</h1>
        <Search
          placeholder="Search patient"
          onChange={handleChange}
          className="w-100"
        />
        <div className="flex flex-col items-start mt-3 justify-start w-full h-[380px] md:h-[380px] overflow-auto custom-scrollbar">
          {handleFilterData(listData).map((item: TreatmentFormData) => (
            <div
              onClick={() => handleClick(item.patientID)}
              key={item.patientName}
              className=" cursor-pointer border-l border-l-zinc-200 pl-3 py-1 w-full hover:border-l-blue-400"
            >
              <span className="text-sm font-semibold">{item.patientName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorySubmit;
