import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ReleaseParkingSpace from "./ReleaseParkingSpace";


test("ReleaseParkingSpace Component Success", async () => { 
  const mockData = "Vehicle Released"
 
  global.fetch = () => Promise.resolve({ json: () => Promise.resolve(mockData) } as Response)
  const {container, getByTestId} = render(<ReleaseParkingSpace />);
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
  await waitFor(() => {
    expect(getByTestId("parking-details")).toBeDefined();
    fireEvent.click(container.getElementsByTagName("button")[0]);
    expect(container.getElementsByTagName("button")[0]).toHaveTextContent("Release Bay")
  });
});

test("ReleaseParkingSpace Component Failed", async () => {  
  global.fetch = () => Promise.reject({} as Response);
  const {container, queryByTestId} = render(<ReleaseParkingSpace />);
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
  await waitFor(() => {
    expect(queryByTestId("parking-details")).toBe(null);
  });
});
