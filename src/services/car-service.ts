import create from "./http-service";

export interface Car {
  _id: string;
  make: string;
  model: string;
  topSpeed: number;
  color: string;
}

export default create("car");
