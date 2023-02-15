import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import Dropdown from "./Dropdown";

test("Dropdown Component", () => {
  const changeSpy = jest.fn();
  const { getByTestId } = render(
    <Dropdown
      label={"Test Input"}
      changeHandler={changeSpy}
      value={"2"}
      options={["1", "2", "3"]}
    />
  );
  fireEvent.change(getByTestId("select"), { target: { value: "1" } });
  expect(changeSpy).toBeCalledTimes(1);
});
