import React from "react";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="block text-green-700 font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
};

export default InputField;
