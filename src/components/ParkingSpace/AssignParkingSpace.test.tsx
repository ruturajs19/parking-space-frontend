import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AssignParkingSpace from "./AssignParkingSpace";

const mockData = { floor: 0, size: "xl", bay: 0 };

test("AssignParkingSpace Component success", async () => {
  global.fetch = () =>
    Promise.resolve({ json: () => Promise.resolve(mockData) } as Response);
  const { container, getByTestId } = render(<AssignParkingSpace />);
  fireEvent.change(container.getElementsByTagName("select")[0], {
    target: { value: "l" },
  });
  expect(container.getElementsByTagName("select")[0]).toHaveValue("l");
  fireEvent.change(container.getElementsByTagName("input")[0], {
    target: { value: "xyz" },
  });
  expect(container.getElementsByTagName("input")[0]).toHaveValue("xyz");
  fireEvent.click(container.getElementsByTagName("button")[0]);
  await waitFor(() => {
    expect(getByTestId("parking-details")).toBeDefined();
    fireEvent.click(container.getElementsByTagName("button")[0]);
    expect(container.getElementsByTagName("button")[0]).toHaveTextContent(
      "Get Available Bay"
    );
  });
});

test("AssignParkingSpace Component failure", async () => {
  global.fetch = () => Promise.reject({} as Response);
  const { container, queryByTestId } = render(<AssignParkingSpace />);
  fireEvent.change(container.getElementsByTagName("select")[0], {
    target: { value: "l" },
  });
  expect(container.getElementsByTagName("select")[0]).toHaveValue("l");
  fireEvent.change(container.getElementsByTagName("input")[0], {
    target: { value: "xyz" },
  });
  expect(container.getElementsByTagName("input")[0]).toHaveValue("xyz");
  fireEvent.click(container.getElementsByTagName("button")[0]);
  await waitFor(() => {
    expect(queryByTestId("parking-details")).toBe(null);
  });
});
