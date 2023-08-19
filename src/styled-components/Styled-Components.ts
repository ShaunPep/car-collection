import { styled } from "styled-components";

const AppContrainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const CarForm = styled.form`
  background-color: #ccc;
  border-radius: 15px;
  padding: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
`;

const InputField = styled.input`
  border-radius: 15px;
  border: none;
  height: 35px;
  padding: 0 16px;
`;

const FormButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  AppContrainer,
  ErrorMessage,
  CarForm,
  InputContainer,
  InputField,
  FormButtonsContainer,
};
