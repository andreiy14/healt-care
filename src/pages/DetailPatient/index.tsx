import { Navbar, WrapperInput } from "../../components";
import { useDataPatient } from "../../hooks";
import { useParams } from "react-router-dom";
import { formatToRupiah } from "../../utils";

type Props = {};

const DetailPatient = (props: Props) => {
  const { patientId } = useParams();
  const { listData } = useDataPatient({ patientId });

  return (
    <div className="relative min-h-screen">
      <main>
        <Navbar />
        <div className="flex-1  px-2.5 pt-10 md:px-20 scroll-auto ">
          <div className="bg-white gap-5 pt-4 flex flex-col rounded-md py-4 mt-2 shadow-md  px-2.5 md:px-20">
            <h1 className="text-md font-bold text-tracking-tight text-gray-900  sm:text-2xl ">
              Detail Data Patient
            </h1>

            <WrapperInput label="Patient ID :">
              <span className="font-semibold text-sm">
                {listData.length > 0 && listData[0].patientID}
              </span>
            </WrapperInput>

            <WrapperInput label="Patient Name :">
              <span className="font-semibold text-sm">
                {" "}
                {listData.length > 0 && listData[0].patientName}
              </span>
            </WrapperInput>

            <WrapperInput label="Date of Treatment :">
              <span className="font-semibold text-sm">
                {listData.length > 0 && listData[0].date
                  ? new Date(listData[0].date).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : null}
              </span>
            </WrapperInput>

            <WrapperInput label="Treatment :">
              {listData.length > 0
                ? listData[0].treatments.map((item) => (
                    <span key={item} className="font-semibold text-sm">
                      {item}
                    </span>
                  ))
                : null}
            </WrapperInput>

            <WrapperInput label="Medications :">
              {listData.length > 0
                ? listData[0].medications.map((item) => (
                    <span key={item} className="font-semibold text-sm">
                      {item}
                    </span>
                  ))
                : null}
            </WrapperInput>

            <WrapperInput label="Cost of Treatment :">
              <span className="font-semibold text-sm">
                Rp{" "}
                {listData.length > 0 ? formatToRupiah(listData[0].cost) : null}
              </span>
            </WrapperInput>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPatient;
