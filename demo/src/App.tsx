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

function App() {

    const [otpProps, setOtpProps] = useState({
        length: 6,
        inputType: "numeric",
        autoFocus: true,
        autoSubmit: true,
        keyHandling: true
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
            <div style={{display: "flex", gap: "5px"}}>
                {/* Dropdown for OTP Length */}
                <label>
                    OTP Length:
                    <select
                        value={otpProps.length}
                        onChange={(e) => handlePropChange('length', parseInt(e.target.value))}
                    >
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        {/* Add more options as needed */}
                    </select>
                </label>

                {/* Dropdown for Input Type */}
                <label>
                    Input Type:
                    <select
                        value={otpProps.inputType}
                        onChange={(e) => handlePropChange('inputType', e.target.value)}
                    >
                        <option value="numeric">Numeric</option>
                        <option value="alphabetic">Alphabetic</option>
                        <option value="alphanumeric">Alphanumeric</option>
                    </select>
                </label>

                {/* Checkboxes for Other Properties */}
                <label>
                    <input
                        type="checkbox"
                        checked={otpProps.autoFocus}
                        onChange={(e) => handlePropChange('autoFocus', e.target.checked)}
                    />
                    Auto Focus
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={otpProps.autoSubmit}
                        onChange={(e) => handlePropChange('autoSubmit', e.target.checked)}
                    />
                    Auto Submit
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={otpProps.keyHandling}
                        onChange={(e) => handlePropChange('keyHandling', e.target.checked)}
                    />
                    Key Handling
                </label>
            </div>
            <AuthFormContent>
                <AuthFormTitle>Log in</AuthFormTitle>
                <AuthButtonSeparator/>
                <AuthForm onSubmit={formik.handleSubmit} key={formKey}>
                    <>
                        <OtpFormLabel htmlFor="otp">[Example Prompt] We just sent you a temporary login code. Please check your
                            inbox.</OtpFormLabel>
                        <OtpInput
                            length={otpProps.length}
                            autoFocus={otpProps.autoFocus}
                            autoSubmit={otpProps.autoSubmit}
                            keyHandling={otpProps.keyHandling}
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
