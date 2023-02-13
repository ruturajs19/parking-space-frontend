import { FormEvent, useState } from "react";
import Dropdown from "../shared/Dropdown/Dropdown";
import Input from "../shared/Input/Input";
import {
  ParkingDetailsModel,
  standardFloors,
  VehicleSizeTypes,
} from "./ParkingSpace.types";
import "./ParkingSpace.css";
import Button from "../shared/Button/Button";

const ReleaseParkingSpace = () => {
  const [vehicleSize, setVehicleSize] = useState(VehicleSizeTypes.s);
  const [assignedFloor, setAssignedFloor] = useState(0);
  const [bay, setBay] = useState(0);
  const [parkingDetails, setParkingDetails] = useState<
    ParkingDetailsModel | undefined
  >();
  const [error, setError] = useState("");

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/releaseBay/${process.env.REACT_APP_PS_ID}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            size: vehicleSize,
            bay,
            floor: assignedFloor,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const assignmentDetails: ParkingDetailsModel = await response.json();
      setParkingDetails(assignmentDetails);
      setAssignedFloor(0);
      setVehicleSize(VehicleSizeTypes.s);
      setBay(0);
    } catch (e) {
      setError("Assignment Failed");
    }
  };

  return (
    <>
      {parkingDetails ? (
        <div className="parking-details">
          Vehicle Released.<br/>
          <Button
            type="button"
            label={"Okay"}
            clickHandler={() => setParkingDetails(undefined)}
          />
        </div>
      ) : (
        <form onSubmit={submitHandler} className="form-content">
          <Dropdown
            label="Select Vehicle Size"
            options={Object.keys(VehicleSizeTypes)}
            value={vehicleSize}
            changeHandler={(value: VehicleSizeTypes) => setVehicleSize(value)}
          />
          <br />
          <Dropdown
            label="Select floor"
            options={Array.from(
              { length: standardFloors },
              (_, idx) => `${idx++}`
            )}
            value={vehicleSize}
            changeHandler={(value: string) => setAssignedFloor(Number(value))}
          />
          <br />
          <Input
            label="Enter Bay"
            type="number"
            min={0}
            value={bay}
            changeHandler={(value: string) => setBay(Number(value))}
          />
          <br />
          <br />
          <Button type="submit" label={"Release Bay"} />
        </form>
      )}
    </>
  );
};

export default ReleaseParkingSpace;
