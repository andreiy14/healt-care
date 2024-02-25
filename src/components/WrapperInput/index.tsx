import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

const WrapperInput = ({ label, children }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="">{label}</label>
      {children}
    </div>
  );
};

export default WrapperInput;
