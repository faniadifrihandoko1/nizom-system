import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  value?: number | string;
  required?: boolean;
  readonly?: boolean;
  register?: UseFormRegister<any>;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  onChange,
  className,
  name = "",
  value,
  required,
  readonly,
  register,
}) => {
  return (
    <input
      readOnly={readonly}
      type={type}
      className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2  `}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required={required}
      {...(register && register(name))}
    />
  );
};

export default Input;
