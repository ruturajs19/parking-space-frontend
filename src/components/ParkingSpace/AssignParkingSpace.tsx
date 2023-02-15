import { FormEvent, useState } from "react";
import Button from "../shared/Button/Button";
import Dropdown from "../shared/Dropdown/Dropdown";
import Input from "../shared/Input/Input";
import { ParkingDetailsModel, VehicleSizeTypes } from "./ParkingSpace.types";
import "./ParkingSpace.css";

const AssignParkingSpace = () => {
  const [vehicleSize, setVehicleSize] = useState(VehicleSizeTypes.s);
  const [regNumber, setRegNumber] = useState("");
  const [parkingDetails, setParkingDetails] = useState<
    ParkingDetailsModel | undefined
  >();
  const [error, setError] = useState("");

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/assignBay/${process.env.REACT_APP_PS_ID}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            size: vehicleSize,
            number: regNumber,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const assignmentDetails: ParkingDetailsModel = await response.json();
      setParkingDetails(assignmentDetails);
      setRegNumber("");
      setVehicleSize(VehicleSizeTypes.s);
    } catch (e) {
      setError("Assignment Failed");
    }
  };

  return (
    <>
      {parkingDetails ? (
        <div>
          <div className="parking-details" data-testid="parking-details">
            Floor: {parkingDetails.floor}<br/>
            Vehicle Size: {parkingDetails.size}<br/>
            Bay: {parkingDetails.bay}<br/>
          </div>
          <Button
            type="button"
            label={"Okay"}
            clickHandler={() => setParkingDetails(undefined)}
          />
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="form-content">
            <Dropdown
              label="Select Vehicle Size"
              options={Object.keys(VehicleSizeTypes)}
              value={vehicleSize}
              changeHandler={(value: VehicleSizeTypes) => setVehicleSize(value)}
            />
            <br />
            <Input
              label="Enter Vehicle Reg. Number"
              type="text"
              value={regNumber}
              changeHandler={(value: string) => setRegNumber(value)}
            />
            <br />
            <br />
            <Button type="submit" label={"Get Available Bay"} />
          </div>
        </form>
      )}
    </>
  );
};

export default AssignParkingSpace;
