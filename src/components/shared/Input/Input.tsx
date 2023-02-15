import { FC, useState } from "react";
import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  value: string | number;
  changeHandler: Function;
}

const Input: FC<InputProps> = ({ label, type, min, value, changeHandler }) => {
  return (
    <>
      <label>{label}:</label>
      <input
        className="input-box"
        value={value}
        type={type}
        min={min}
        onChange={(event) => changeHandler(event.target.value)}
        data-testid="custom-input"
      />
    </>
  );
};

export default Input;
