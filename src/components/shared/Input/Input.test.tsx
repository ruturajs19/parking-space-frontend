import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

test("Input Component", () => {
  const changeSpy = jest.fn();
  const { container } = render(
    <Input label={"Test Input"} changeHandler={changeSpy} value={"abc"} />
  );
  expect(screen.getByTestId("custom-input")).toHaveValue("abc");
  fireEvent.change(container.getElementsByTagName("input")[0], {
    target: { value: "xyz" },
  });
  expect(changeSpy).toBeCalledTimes(1)
});
