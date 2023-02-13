import { useState } from "react";
import "./App.css";
import AssignParkingSpace from "./components/ParkingSpace/AssignParkingSpace";
import ReleaseParkingSpace from "./components/ParkingSpace/ReleaseParkingSpace";
import Button from "./components/shared/Button/Button";

const App = () => {
  const [isAssignMode, setAssignMode] = useState(true);
  return (
    <div className="App">
      <div className="app-container">
        {isAssignMode ? <AssignParkingSpace /> : <ReleaseParkingSpace />}
        <br />
        <Button
          label={isAssignMode ? "Release Vehicle" : "Assign Vehicle"}
          clickHandler={() => setAssignMode((prevData) => !prevData)}
        />
      </div>
    </div>
  );
};

export default App;
