import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useDataPatient } from "../../hooks";
import { TreatmentFormData } from "../../types";

type Props = {};

const { Search } = Input;
const HistorySubmit = (props: Props) => {
  const { listData } = useDataPatient();
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="hidden md:flex md:visible px-2.5 pt-10 md:px-20 scroll-auto  h-[500px]">
      <div className="bg-white pt-4 flex flex-col items-start justify-start gap-2  rounded-md py-1 shadow-md px-2 ">
        <h1 className="text-sm font-bold">History</h1>
        <Search
          placeholder="Search patient"
          onSearch={onSearch}
          className="w-100"
        />
        <div className="flex flex-col items-start mt-3 justify-start w-full">
          {listData.map((item: TreatmentFormData) => (
            <div
              key={item.patientID}
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
