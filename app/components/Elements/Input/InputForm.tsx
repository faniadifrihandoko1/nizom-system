import React from "react";
import Label from "./Label";
import Input from "./Input";
import { UseFormRegister } from "react-hook-form";
interface Props {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameLabel?: string;
  classNameInput?: string;
  value?: string | number;
  classNameParent?: string;
  register?: UseFormRegister<any>;
  readonly?: boolean;
}

export default function InputForm({
  name,
  label,
  type,
  placeholder,
  required,
  classNameLabel,
  classNameInput,
  classNameParent,
  value,
  register,
  readonly,
}: Props) {
  return (
    <div className={classNameParent}>
      <Label htmlFor={name} className={classNameLabel}>
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        name={name}
        type={type}
        required={required}
        className={classNameInput}
        value={value as number | undefined}
        register={register}
        readonly={readonly}
      />
    </div>
  );
}
