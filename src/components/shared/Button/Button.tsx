import { FC } from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  clickHandler?: Function;
}

const Button: FC<ButtonProps> = ({ label, type, clickHandler }) => {
  return (
    <button
      className="custom-button"
      type={type}
      onClick={()=> clickHandler && clickHandler()}
    >
      {label}
    </button>
  );
};

export default Button;
