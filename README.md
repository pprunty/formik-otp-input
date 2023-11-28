# formik-otp-input 🪪

`formik-otp-input` is an enhancement to the [formik](https://github.com/jaredpalmer/formik) library, 
designed specifically for React applications. This extension introduces a specialized OTP (one-time-password) input
feature. It offers a customizable input field count for the password, along with user-defined options for automating 
focus, submission, and key change events. Additionally, this extension supports autofill suggestions on mobile devices, which may vary based on the user's mobile or email service provider."

The inspiration for this project came in part from the smooth checkout process experienced with [Stripe/Link payments](https://stripe.com/docs/payments/link).
Its integration is versatile, making it suitable for a variety of applications, such as:

1. Verification processes via email or mobile.
2. Authentication workflows through email/SMS or passwordless systems.
3. Two-factor authentication (2FA) for added security.
4. Secure online payment and transaction confirmation.
5. User registration and login procedures for web and mobile applications.
6. Quick response actions in interactive customer service tools

## Installation 💿

Install the package by running:

### npm

```sh
npm install formik-otp-input
```

### yarn

```sh
yarn install formik-otp-input
```

## Demo 🖥️

A live demo of this component is hosted on GitHub pages and can be previewed by following [this link]().

The source code used for the demo can be found [here](https://github.com/pprunty/formik-otp-input/blob/main/demo/src/App.tsx).

## Usage 🔨

### Basic example 
Import `Index`  from the package and use them in your component.

```jsx
import React from 'react';
import { useFormik } from 'formik';
import Index from 'formik-otp-input'; // Import the Index component


// Define inline styles (you can define styles whatever way you like)
const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
};

const errorMessage = {
    color: 'red',
    fontSize: '12px',
    marginTop: '15px',
    textAlign: 'center',
}

const SimpleForm = () => {
    // Using useFormik to initialize Formik
    const formik = useFormik({
        initialValues: { otp: '' },
        onSubmit: (values) => {
            console.log('OTP Submitted:', values.otp);
            // Handle OTP submission logic here (i.e call on backend API to validate OTP)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label 
                htmlFor="otp" 
                style={labelStyle}
            >
                We just sent you a temporary login code. 
                Please check your inbox.
            </label>
            <Index
                length={6} // Define the length of the OTP
                value={formik.values.otp}
                onChange={formik.handleChange}
                onFullFill={formik.handleSubmit} // Submit the form when OTP is fully entered
                setFieldError={formik.setFieldError}
                setFieldTouched={formik.setFieldTouched}
                inputType={"numeric"} // This is "numeric" by default, other options are "alphabetic" and "alphanumeric"
                autoFocus={true} // This is true by default, will auto focus the first field in the Index
                autoSubmit={true} // This is true by default, will auto submit when all six otp values are filled
                keyHandling={true} // This is true by default, allows users to use backspace and arrow keyboard keys
            />
            {formik.touched.otp && formik.errors.otp && (
                <div style={labelStyle}>{formik.errors.otp}</div>
            )}
            <button type="submit" disabled={formik.isSubmitting}>
                Submit
            </button>
        </form>
    );
};

export default SimpleForm;
```

### Advanced Example
Typically, one-time-password flow is a two-step process. The first, involves providing an email or mobile number and 
making an API call to the backend to trigger the generation of the one-time-password. The second, involves providing the
OTP input field for the user to input before making a second API call to the server to validate the OTP. 

The following example details how to integration the Index component in such a two-step process:

```jsx
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const OTPSchema = Yup.object().shape({
  otp: Yup.number().required('Required'),
});

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = (values, actions) => {
    if (step === 1) {
      // Send OTP to email
      // Switch to step 2
      setStep(2);
    } else {
      // Final submission with OTP
      // Submit to server or handle accordingly
    }
  };

  return (
    <Formik
      initialValues={{ email: '', otp: '' }}
      validationSchema={step === 1 ? EmailSchema : OTPSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {step === 1 && <Field type="email" name="email" />}
          {step === 2 && <Field type="number" name="otp" />}
          
          <button type="submit" disabled={isSubmitting}>
            {step === 1 ? 'Send OTP' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;

```


## Contributors ✨


## License 🎫

This project is licensed under the MIT License.
