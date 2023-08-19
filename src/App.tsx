import { useState } from 'react';
import './App.css';

import useCars from './hooks/useCars';
import CarList from './components/CarList';
import Button from './components/Button';
import Form from './components/Form';
import carService, { Car } from './services/car-service';
import {AppContrainer, ErrorMessage} from "./styled-components/Styled-Components";

function App() {
  const {cars, selectedCar, error, setCars, setSelectedCar, setError} = useCars();
  const [displayAddCar, setDisplayAddCar] = useState(false);

  const addCar = (data: any) => {
    carService.add(data).then(({data: savedCar}) => {
      data._id = savedCar.insertedId;
      setCars([data, ...cars]);

      setDisplayAddCar(!displayAddCar);
    }).catch((error) => {
      setError(error.response.data.error);
    });
  }

  const deleteCar = (carId: string) => {
    const originalCars = [...cars];
    setCars(cars.filter((x) => x._id !== carId));

    carService.delete(carId).catch((error) => {
      setError(error.response.data.error);
      setCars(originalCars);
    });
  };

  const updateCar = (car: Car) => {
    car._id = selectedCar!._id;

    const originalCars = [...cars];
    const newState = cars.map(item => {
      if (item._id === selectedCar?._id) {
        return {...item, model: car.model, make: car.make, topSpeed: car.topSpeed, color: car.color};
      }
      return item;
    });
    setCars(newState);

    carService.update(car).then(() => {
      clearForm();
    }).catch((error) => {
      setError(error.response.data.error);
      setCars(originalCars);
    });
  }

  const clearForm = () => {
    setDisplayAddCar(!displayAddCar);
    setSelectedCar(null);
  }

  return (
    <AppContrainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={() => {
        setSelectedCar(undefined);
        setDisplayAddCar(!displayAddCar)
      }}>Add New Car</Button>
      {displayAddCar && <Form car={selectedCar} onSubmitted={(data) => {
        if (selectedCar) {
          updateCar(data);
        } else {
          addCar(data);
        }
      }} onCancelled={() => clearForm()} />}
      <CarList selectedCar={selectedCar} items={cars} onSelectItem={(item) => {
        setSelectedCar(item);
        setDisplayAddCar(true);
      }} onDeleteItem={(id) => deleteCar(id)} />
    </AppContrainer>
  );
}

export default App;
