import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import {
  formatToRupiah,
  treatmentOptions,
  medicationOptions,
} from "../../utils";
import { TreatmentFormData, InputError } from "../../types";
import { useSubmitDataPatient } from "../../hooks";

type Props = {};

const FormPatient = (props: Props) => {
  const { handleSubmitData, isErrorSubmit } = useSubmitDataPatient();
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

  const handleSubmit = () => {
    const newErrors = { ...error };

    Object.entries(formData).forEach(([key, value]) => {
      if (
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && value === 0)
      ) {
        newErrors[key as keyof InputError] = "This field is required";
      } else {
        newErrors[key as keyof InputError] = "";
      }
    });

    setError(newErrors);

    // Submit the form if there are no errors
    if (Object.values(newErrors).every((error) => !error)) {
      handleSubmitData(formData);
    }
  };

  return (
    <div className="flex-1  px-2.5 pt-10 md:px-20 scroll-auto ">
      <div className="bg-white pt-4 flex flex-col rounded-md py-1 shadow-md  px-2.5 md:px-20">
        <h1 className="text-md font-bold text-tracking-tight text-gray-900  sm:text-2xl ">
          Form Patient
        </h1>
        <Form onFinish={handleSubmit} className="flex flex-col gap-4 pt-8 pb-4">
          <div className="flex flex-col">
            <label className="" htmlFor="patientName">
              Patient Name:
            </label>
            <Form.Item
              help={error?.patientName}
              validateStatus={error.patientName ? "error" : ""}
            >
              <Input
                status={error.patientName ? "error" : ""}
                value={formData.patientName}
                className="w-full"
                name="patientName"
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <label className="" htmlFor="patientID">
              Patient ID:
            </label>
            <Form.Item
              help={error?.patientID}
              validateStatus={error.patientID ? "error" : ""}
            >
              <Input
                status={error.patientID ? "error" : ""}
                value={formData.patientID}
                className="w-full"
                name="patientID"
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <label className="" htmlFor="date">
              Date of Treatment
            </label>
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
          </div>
          <div className="flex flex-col">
            <label className="" htmlFor="treatments">
              Treatment
            </label>
            <Form.Item
              help={error?.treatments}
              validateStatus={error.treatments ? "error" : ""}
            >
              <Select
                status={error.treatments ? "error" : ""}
                mode="multiple"
                allowClear
                placeholder="Select treatments"
                options={treatmentOptions}
                onChange={(selectedValues) =>
                  handleSelectChange(selectedValues, "treatments")
                }
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <label className="" htmlFor="medications">
              Medications
            </label>
            <Form.Item
              help={error?.medications}
              validateStatus={error.medications ? "error" : ""}
            >
              <Select
                status={error.medications ? "error" : ""}
                mode="multiple"
                allowClear
                placeholder="Select medications"
                options={medicationOptions}
                onChange={(selectedValues) =>
                  handleSelectChange(selectedValues, "medications")
                }
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <label className="" htmlFor="cost">
              Cost of Treatment:
            </label>
            <Form.Item
              help={error?.cost}
              validateStatus={error.cost ? "error" : ""}
            >
              <Input
                status={error.cost ? "error" : ""}
                value={formatToRupiah(formData.cost)}
                type="text"
                name="cost"
                onChange={handleChangeCost}
              />
            </Form.Item>
          </div>

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
