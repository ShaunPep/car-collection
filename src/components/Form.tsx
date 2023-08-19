import { useEffect } from "react";
import {FieldValues, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import { Car } from "../services/car-service";
import Button from './Button';
import { ErrorMessage, CarForm, InputContainer, InputField, FormButtonsContainer } from "../styled-components/Styled-Components";

const schema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    topSpeed: z.number().min(100),
    color: z.string()
});
type FormData = z.infer<typeof schema>;

interface Props {
    car?: Car | null;
    onSubmitted: (data: any) => void;
    onCancelled: () => void;
}

const Form = ({car, onSubmitted, onCancelled}: Props) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<FormData>({resolver: zodResolver(schema)});

    const onSubmit = (data: FieldValues) => onSubmitted(data);

    useEffect(() => {
        if (car) {
            setValue("make", car.make);
            setValue("model", car.model);
            setValue("topSpeed", car.topSpeed);
            setValue("color", car.color);
        }
    }, [car]);

    const submitButtonTitle = car ? "Update" : "Add";

    return (
        <CarForm onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <label htmlFor="make">Make</label>
                <InputField {...register("make")} id="make" type="text" />
                {errors.make && <ErrorMessage>{errors.make.message}</ErrorMessage>}
            </InputContainer>

            <InputContainer>
                <label htmlFor="model">Model</label>
                <InputField {...register("model")} id="model" type="text" />
                {errors.model && <ErrorMessage>{errors.model.message}</ErrorMessage>}
            </InputContainer>

            <InputContainer>
                <label htmlFor="topSpeed">Top Speed</label>
                <InputField {...register("topSpeed", {valueAsNumber: true})} id="topSpeed" type="number" />
                {errors.topSpeed && <ErrorMessage>{errors.topSpeed.message}</ErrorMessage>}
            </InputContainer>

            <InputContainer>
                <label htmlFor="color">Color</label>
                <InputField {...register("color")} id="color" type="text" />
                {errors.color && <ErrorMessage>{errors.color.message}</ErrorMessage>}
            </InputContainer>

            <FormButtonsContainer>
                <Button type="submit">{submitButtonTitle}</Button>
                <Button primary={false} onClick={onCancelled}>Cancel</Button>
            </FormButtonsContainer>
        </CarForm>
    );
};

export default Form;