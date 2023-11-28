import styled from "styled-components";

export const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const OtpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthForm = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

export const AuthFormContent = styled.div`
    width: 350px;
  display: flex;
  flex-direction: column;
`;

export const AuthFormTitle = styled.h3`
  text-align: center;
  font-size: 52px;
  margin-top: 6vh;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.1;
  max-width: 380px;
`;

export const FormLabel = styled.label`
  margin-top: 10px;
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: rgba(55, 53, 47, 0.65);
`;

export const OtpFormLabel = styled.label`
  margin-top: 10px;
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  justify-content: center;
  cursor: text; // Update cursor style based on emailSubmitted state
  //width: 80%;
  padding: 5px;
  text-align: center;
  color: rgba(55, 53, 47, 0.65);
`;


export const FormInput = styled.input`
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
  line-height: 10px;
`;

export const SubmitButton = styled.button`
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1;
  padding-left: 12px;
  padding-right: 12px;
  font-weight: 500;
  background: #fcf6f2;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px, rgba(239, 142, 58, 0.3) 0px 0px 0px 1px inset;
  color: #ff7300;
  margin-top: 25px;
  margin-bottom: 12px;
  width: 100%;
  border: none;

  &:hover {
    background-color: #f8eee9;
  }
`;

export const ErrorMessage = styled.div`
  color: red; // Use your desired color for error messages
  font-size: 12px;
  margin-top: 15px;
  text-align: center;
  //margin-left: 4px;
`;

export const NavigateButton = styled(SubmitButton)`
  background-color: #6c757d; // A different color to distinguish from the submit button
  margin-bottom: 20px;

  &:hover {
    background-color: #5a6268;
  }
`;

export const AuthButtonSeparator = styled.div`
  height: 1px;
  background-color: #37352f; // Use a color that fits your design
  opacity: 0.16;
  margin: 25px 0; // Adjust the space before and after the separator
  width: 100%; // This will ensure the separator stretches across the container
`;

