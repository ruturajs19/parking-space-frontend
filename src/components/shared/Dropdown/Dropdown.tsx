import { FC } from "react";
import "./Dropdown.css";

interface DropdownProps {
  label: string;
  value: string | number;
  changeHandler: Function;
  options: any[];
}

const Dropdown: FC<DropdownProps> = ({
  label,
  value,
  changeHandler,
  options,
}) => {
  return (
    <>
      <label>{label}:</label>
      <select
        className="dropdown-box"
        value={value}
        data-testid="select"
        onChange={(event) => {
          changeHandler(event.target.value);
        }}
      >
        {options.map((item: any, index: number) => (
          <option key={index} data-testid="option">{item}</option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
