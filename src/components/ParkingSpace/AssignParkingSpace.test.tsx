import { fireEvent, render, screen } from "@testing-library/react";
import AssignParkingSpace from "./AssignParkingSpace";

global.fetch = jest.fn().mockImplementation(() => ({
  json: () => Promise.resolve({ floor: 0, size: "xl", bay: 0 }),
})) as jest.Mock;

test("AssignParkingSpace Component", () => {
  const { container } = render(<AssignParkingSpace />);
  fireEvent.change(container.getElementsByTagName("select")[0], {
    target: { value: "l" },
  });
  expect(container.getElementsByTagName("select")[0]).toHaveValue("l");
  fireEvent.change(container.getElementsByTagName("input")[0], {
    target: { value: "xyz" },
  });
  expect(container.getElementsByTagName("input")[0]).toHaveValue("xyz");
  fireEvent.click(container.getElementsByTagName("button")[0]);
  console.log(screen.debug());
});
