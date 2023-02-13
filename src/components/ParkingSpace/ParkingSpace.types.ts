export enum VehicleSizeTypes {
  s = "s",
  m = "m",
  l = "l",
  xl = "xl",
}

export const standardFloors = 3;

export interface ParkingDetailsModel {
  floor: number;
  bay: number;
  size: VehicleSizeTypes;
}
