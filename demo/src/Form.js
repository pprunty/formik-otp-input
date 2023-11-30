import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OtpInput from './OtpInput';
import {OtpFormLabel} from "./AuthFormStyles"; // Assuming OtpInput is in the same directory

const YOUR_OTP_LENGTH = 6; // Replace this with the length of your OTP

// Validation schema
// const validationSchema = Yup.object({
//     otp: Yup.string()
//         .required('OTP is required')
//         .length(YOUR_OTP_LENGTH, `OTP must be exactly ${YOUR_OTP_LENGTH} characters long`),
//     // ... validation for other fields
// });

// CSS Styles
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
};

const fieldStyle = {
    margin: '10px 0',
};

const errorTextStyle = {
    marginTop: '15px',
    fontSize: '14px',
    color: '#ff6b6b',
    marginBottom: '10px',
};

const submitButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px', // Added top margin

    ':hover': {
        backgroundColor: '#45a049',
    },
};

// Form component
const OtpForm = () => {
    const formik = useFormik({
        initialValues: {
            otp: '',
            // ... other form fields
        },
        onSubmit: (values) => {
            console.log('Form data:', values);
            window.alert("Submitted");
            // Perform submission actions
        },
    });

    return (
        <form style={formStyle} onSubmit={formik.handleSubmit}>
            {/*<OtpFormLabel htmlFor="otp">[Example Prompt] We just sent you a temporary login code. Please*/}
            {/*    check your*/}
            {/*    inbox.</OtpFormLabel>*/}
            <OtpInput
                length={YOUR_OTP_LENGTH}
                value={formik.values.otp}
                inputType={"numeric"}    // options are numeric, alphabetic or alphanumeric
                autoFocus={true}    // Default is true. Will auto-focus first digit if true
                autoSubmit={true}    // Default is true. Will auto-submit form onFullFill
                onBlur={formik.handleBlur}   // Formik handler, used to handle onBlur events
                onChange={formik.handleChange}   // Formik handler, used to handle change events
                onFullFill={formik.handleSubmit}     // Formik handler, used to handle autoSubmit
                setFieldError={formik.setFieldError}     // Formik handler, used to handle error rendering
                setFieldTouched={formik.setFieldTouched}
                // ... other props you need to pass
                highlightColor={'#4caf50'}
                // textColor={'#FFFFFF'}
                // backgroundColor={'#FFFFFF'}
                // borderColor={'#FFFFFF'}
                // ... other input props
            />
            {formik.errors.otp && formik.touched.otp && (
                <div style={errorTextStyle}>{formik.errors.otp}</div>
            )}

            <button type="submit" style={submitButtonStyle} >Submit</button>
        </form>
    );
};

export default OtpForm;
