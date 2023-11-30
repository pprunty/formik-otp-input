import React, {CSSProperties, useEffect, useState} from 'react';
import {
    AuthButtonSeparator,
    AuthFormContainer,
    AuthFormContent,
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
  justify-content: center;
  
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

// CSS Styles
const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
};

const fieldStyle: CSSProperties = {
    margin: '10px 0',
};

const errorTextStyle: CSSProperties = {
    marginTop: '15px',
    fontSize: '14px',
    color: '#ff6b6b',
    marginBottom: '10px',
};

const submitButtonStyle: CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px', // Added top margin

};

function App() {

    const [otpProps, setOtpProps] = useState({
        length: 4,
        inputType: "numeric",
        autoFocus: true,
        autoSubmit: true,
        textColor: '#000000',
        backgroundColor: '#ffffff',
        highlightColor: '#4caf50',
        borderColor: '#DDDDDD'
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
                <OTPSetting>
                    <Label>
                        Text Color:
                        <input
                            type="color"
                            value={otpProps.textColor}
                            onChange={(e) => handlePropChange('textColor', e.target.value)}
                        />
                    </Label>
                </OTPSetting>

                {/* Color Picker for Background Color */}
                <OTPSetting>
                    <Label>
                        Background Color:
                        <input
                            type="color"
                            value={otpProps.backgroundColor}
                            onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                        />
                    </Label>
                </OTPSetting>

                <OTPSetting>
                    <Label>
                        Border Color:
                        <input
                            type="color"
                            value={otpProps.borderColor}
                            onChange={(e) => handlePropChange('borderColor', e.target.value)}
                        />
                    </Label>
                </OTPSetting>

                {/* Color Picker for Highlight Color */}
                <OTPSetting>
                    <Label>
                        Highlight Color:
                        <input
                            type="color"
                            value={otpProps.highlightColor}
                            onChange={(e) => handlePropChange('highlightColor', e.target.value)}
                        />
                    </Label>
                </OTPSetting>
            </OTPSettingsContainer>
            <AuthButtonSeparator/>

            <AuthFormContent>
                <form style={formStyle} onSubmit={formik.handleSubmit} key={formKey}>
                    <OtpInput
                        length={otpProps.length}
                        value={formik.values.otp}
                        inputType={otpProps.inputType}    // options are numeric, alphabetic or alphanumeric
                        autoFocus={otpProps.autoFocus}    // Default is true. Will auto-focus first digit if true
                        autoSubmit={otpProps.autoSubmit}    // Default is true. Will auto-submit form onFullFill
                        onBlur={formik.handleBlur}   // Formik handler, used to handle onBlur events
                        onChange={formik.handleChange}   // Formik handler, used to handle change events
                        onFullFill={formik.handleSubmit}     // Formik handler, used to handle autoSubmit
                        setFieldError={formik.setFieldError}     // Formik handler, used to handle error rendering
                        setFieldTouched={formik.setFieldTouched}
                        // ... other props you need to pass
                        highlightColor={otpProps.highlightColor}
                        textColor={otpProps.textColor}
                        backgroundColor={otpProps.backgroundColor}
                        borderColor={otpProps.borderColor}
                    />
                    {formik.errors.otp && formik.touched.otp && (
                        <div style={errorTextStyle}>{formik.errors.otp}</div>
                    )}
                    <button type="submit" style={submitButtonStyle} >Submit</button>
                </form>
            </AuthFormContent>
        </AuthFormContainer>
    );
}

export default App;
