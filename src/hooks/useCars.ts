import { useEffect, useState } from "react";
import carService, { Car } from "../services/car-service";
import { CanceledError } from "axios";

const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>();

  useEffect(() => {
    const { request, cancel } = carService.getAll<Car>();
    request
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          return;
        }

        console.log(error.message);
      });

    return () => cancel();
  }, []);

  return { cars, selectedCar, error, setCars, setSelectedCar, setError };
};

export default useCars;
