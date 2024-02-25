import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import {
  formatToRupiah,
  treatmentOptions,
  medicationOptions,
} from "../../utils";
import { TreatmentFormData, InputError } from "../../types";
import WrapperInput from "../WrapperInput";

type Props = {
  handleSubmitData: (data: TreatmentFormData) => void;
  handleOpenHistory: () => void;
  isErrorSubmit: boolean;
};

const FormPatient = ({
  handleSubmitData,
  isErrorSubmit,
  handleOpenHistory,
}: Props) => {
  const [formData, setFormData] = useState<TreatmentFormData>({
    patientName: "",
    patientID: "",
    date: new Date(),
    treatments: [],
    medications: [],
    cost: 0,
  });

  const [error, setError] = useState<InputError>({
    patientName: "",
    patientID: "",
    date: "",
    treatments: "",
    medications: "",
    cost: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSelectChange = (selectedValues: string[], fieldName: string) => {
    setFormData({ ...formData, [fieldName]: selectedValues });
  };

  const handleChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setFormData({
      ...formData,
      cost: Number(
        inputValue
          .toString()
          .replace(/\./g, "")
          .replace(/[^0-9]/g, "")
      ),
    });
  };

  const handleChangeDate = (_date: dayjs.Dayjs) => {
    setFormData({ ...formData, date: _date.toDate() });
  };

  const validateString = (value: string) => {
    var pattern = /^[a-zA-Z]+$/;
    return pattern.test(value);
  };
  const handleSubmit = () => {
    const newErrors = { ...error };

    Object.entries(formData).forEach(([key, value]) => {
      if (
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && value === 0)
      ) {
        newErrors[key as keyof InputError] = "This field is required";
      } else if (key === "patientID" && validateString(value)) {
        newErrors[key as keyof InputError] =
          "Please enter a valid number or alphanumeric value.";
      } else {
        newErrors[key as keyof InputError] = "";
      }
    });

    setError(newErrors);

    // Submit the form if there are no errors
    if (Object.values(newErrors).every((error) => !error)) {
      handleSubmitData(formData);
      setFormData({
        patientName: "",
        patientID: "",
        date: new Date(),
        treatments: [],
        medications: [],
        cost: 0,
      });
    }
  };

  const handleErrorRemove = (fieldName: string) => {
    const newErrors = { ...error };
    newErrors[fieldName as keyof InputError] = "";

    setError(newErrors);
  };

  return (
    <div className="flex-1  px-2.5 pt-10 md:px-20 scroll-auto ">
      <div className="md:hidden">
        <Button onClick={handleOpenHistory}> History Data</Button>
      </div>
      <div className="bg-white pt-4 flex flex-col rounded-md py-1 mt-2 shadow-md  px-2.5 md:px-20">
        <h1 className="text-md font-bold text-tracking-tight text-gray-900  sm:text-2xl ">
          Form Patient
        </h1>
        <Form onFinish={handleSubmit} className="flex flex-col gap-4 pt-8 pb-4">
          <WrapperInput label="Patient Name :">
            <Form.Item
              help={error?.patientName}
              validateStatus={error.patientName ? "error" : ""}
            >
              <Input
                onFocus={() => handleErrorRemove("patientName")}
                status={error.patientName ? "error" : ""}
                value={formData.patientName}
                className="w-full"
                name="patientName"
                onChange={handleInputChange}
              />
            </Form.Item>
          </WrapperInput>

          <WrapperInput label="Patient ID :">
            <Form.Item
              help={error?.patientID}
              validateStatus={error.patientID ? "error" : ""}
            >
              <Input
                onFocus={() => handleErrorRemove("patientID")}
                status={error.patientID ? "error" : ""}
                value={formData.patientID}
                className="w-full"
                name="patientID"
                onChange={handleInputChange}
              />
            </Form.Item>
          </WrapperInput>

          <WrapperInput label="Date of Treatment :">
            <Form.Item
              help={error?.date}
              validateStatus={error.date ? "error" : ""}
            >
              <DatePicker
                status={error.date ? "error" : ""}
                showTime={false}
                value={dayjs(formData.date)}
                name="date"
                className="w-full"
                onChange={handleChangeDate}
              />
            </Form.Item>
          </WrapperInput>

          <WrapperInput label="Treatment :">
            <Form.Item
              help={error?.treatments}
              validateStatus={error.treatments ? "error" : ""}
            >
              <Select
                onFocus={() => handleErrorRemove("treatments")}
                status={error.treatments ? "error" : ""}
                mode="multiple"
                allowClear
                placeholder="Select treatments"
                value={formData.treatments}
                options={treatmentOptions}
                onChange={(selectedValues) =>
                  handleSelectChange(selectedValues, "treatments")
                }
              />
            </Form.Item>
          </WrapperInput>

          <WrapperInput label="Medications :">
            <Form.Item
              help={error?.medications}
              validateStatus={error.medications ? "error" : ""}
            >
              <Select
                status={error.medications ? "error" : ""}
                mode="multiple"
                onFocus={() => handleErrorRemove("medications")}
                allowClear
                value={formData.medications}
                placeholder="Select medications"
                options={medicationOptions}
                onChange={(selectedValues) =>
                  handleSelectChange(selectedValues, "medications")
                }
              />
            </Form.Item>
          </WrapperInput>

          <WrapperInput label="Cost of Treatment :">
            <Form.Item
              help={error?.cost}
              validateStatus={error.cost ? "error" : ""}
            >
              <Input
                status={error.cost ? "error" : ""}
                value={formatToRupiah(formData.cost)}
                type="text"
                name="cost"
                onFocus={() => handleErrorRemove("cost")}
                onChange={handleChangeCost}
              />
            </Form.Item>
          </WrapperInput>

          <Button
            disabled={isErrorSubmit}
            className="mt-6 w-auto"
            htmlType="submit"
          >
            Submit Treatment
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FormPatient;
