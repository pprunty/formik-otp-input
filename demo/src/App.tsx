import React, {useEffect, useState} from 'react';
import {
    AuthButtonSeparator, AuthForm,
    AuthFormContainer,
    AuthFormContent,
    AuthFormTitle, ErrorMessage, OtpFormLabel,
    SubmitButton,
} from "./AuthFormStyles";
import {useFormik} from "formik";
import OtpInput from './OtpInput';
import styled from "styled-components";


// OTP settings container
const OTPSettingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// Individual setting
const OTPSetting = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

// Styled select and checkbox
const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 4px;
  background-color: white;
  margin-left: 6px;
`;

const Checkbox = styled.input.attrs({type: 'checkbox'})`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Styled label
const Label = styled.label`
  font-size: 16px;
  color: #333;
`;

function App() {

    const [otpProps, setOtpProps] = useState({
        length: 4,
        inputType: "numeric",
        autoFocus: true,
        autoSubmit: true,
    });

    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        // This will change the formKey every time otpProps changes
        setFormKey(prevKey => prevKey + 1);
    }, [otpProps]); // Dependency array includes otpProps


    const handlePropChange = (propName: string, value: any) => {
        setOtpProps(prevProps => ({...prevProps, [propName]: value}));
    };

    const formik = useFormik({
        initialValues: {otp: ''},
        onSubmit: (values) => {
            window.alert(`OTP Submitted: ${values.otp}`);
            // Handle OTP submission logic here (i.e call on backend API to validate OTP)
        },
    });

    return (
        <AuthFormContainer>
            {/* UI for selecting OTP Input properties */}
            <OTPSettingsContainer>
                {/* Dropdown for OTP Length */}
                <OTPSetting>
                    <Label>
                        One-Time-Password (OTP) code length:
                        <Select
                            value={otpProps.length}
                            onChange={(e) => handlePropChange('length', parseInt(e.target.value))}
                        >
                            <option value={4}>4</option>
                            <option value={6}>6</option>
                            {/* Add more options as needed */}
                        </Select>
                    </Label>
                </OTPSetting>

                {/* Dropdown for Input Type */}
                <OTPSetting>
                    <Label>
                        Input Type:
                        <Select
                            value={otpProps.inputType}
                            onChange={(e) => handlePropChange('inputType', e.target.value)}
                        >
                            <option value="numeric">Numeric</option>
                            <option value="alphabetic">Alphabetic</option>
                            <option value="alphanumeric">Alphanumeric</option>
                        </Select>
                    </Label>
                </OTPSetting>

                {/* Checkboxes for Other Properties */}
                {/* Auto Focus */}
                <OTPSetting>
                    <Checkbox
                        checked={otpProps.autoFocus}
                        onChange={(e) => handlePropChange('autoFocus', e.target.checked)}
                    />
                    <Label>Auto Focus</Label>
                </OTPSetting>

                {/* Auto Submit */}
                <OTPSetting>
                    <Checkbox
                        checked={otpProps.autoSubmit}
                        onChange={(e) => handlePropChange('autoSubmit', e.target.checked)}
                    />
                    <Label>Auto Submit</Label>
                </OTPSetting>
            </OTPSettingsContainer>
            <AuthFormContent>
                <AuthFormTitle>Log in</AuthFormTitle>
                <AuthButtonSeparator/>
                <AuthForm onSubmit={formik.handleSubmit} key={formKey}>
                    <>
                        <OtpFormLabel htmlFor="otp">[Example Prompt] We just sent you a temporary login code. Please
                            check your
                            inbox.</OtpFormLabel>
                        <OtpInput
                            length={otpProps.length}
                            autoFocus={otpProps.autoFocus}
                            autoSubmit={otpProps.autoSubmit}
                            inputType={otpProps.inputType}
                            onBlur={formik.handleBlur}
                            value={formik.values.otp}
                            onChange={formik.handleChange}
                            autoComplete="one-time-code"
                            onFullFill={formik.handleSubmit} // Pass the submitForm function to OtpInput
                            setFieldError={formik.setFieldError} // Pass setFieldError to OtpInput
                            setFieldTouched={formik.setFieldTouched} // Pass this prop to OtpInput
                        />
                    </>
                    {formik.touched.otp && formik.errors.otp && (
                        <ErrorMessage>{formik.errors.otp}</ErrorMessage>
                    )}
                    <SubmitButton type={"submit"} disabled={formik.isSubmitting}>
                        Submit
                    </SubmitButton>
                </AuthForm>
            </AuthFormContent>
        </AuthFormContainer>
    );
}

export default App;
