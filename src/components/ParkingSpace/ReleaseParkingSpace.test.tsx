import { fireEvent, render, screen } from "@testing-library/react";
import ReleaseParkingSpace from "./ReleaseParkingSpace";

test("AssignParkingSpace Component", () => {  
  const {container} = render(<ReleaseParkingSpace />);
  fireEvent.change(container.getElementsByTagName("select")[0], {
    target: { value: "l" },
  });
  expect(container.getElementsByTagName("select")[0]).toHaveValue("l")
  fireEvent.change(container.getElementsByTagName("select")[1], {
    target: { value: "0" },
  });
  expect(container.getElementsByTagName("select")[1]).toHaveValue("0")
  fireEvent.change(container.getElementsByTagName("input")[0], {
    target: { value: "33" },
  });
  expect(container.getElementsByTagName("input")[0]).toHaveValue(33)
  fireEvent.click(container.getElementsByTagName("button")[0])
  console.log(screen.debug())
});
