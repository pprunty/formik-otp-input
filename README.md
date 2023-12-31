[![npm version](https://img.shields.io/npm/v/formik-otp-input)](https://www.npmjs.com/package/formik-otp-input)
[![npm downloads](https://img.shields.io/npm/dm/formik-otp-input)](https://www.npmjs.com/package/formik-otp-input)
[![npm minzip size](https://img.shields.io/bundlephobia/minzip/formik-otp-input)](https://www.npmjs.com/package/formik-otp-input)
[![GitHub contributors](https://img.shields.io/github/contributors/pprunty/formik-otp-input)](https://github.com/pprunty/formik-otp-input/graphs/contributors)
[![npm license](https://img.shields.io/npm/l/formik-otp-input)](https://www.npmjs.com/package/formik-otp-input)


Author: [Patrick Prunty](https://pprunty.github.io/pprunty/).

# formik-otp-input 🪪

`formik-otp-input` is an enhancement to the [formik](https://github.com/jaredpalmer/formik) library, 
designed specifically for React applications. This extension introduces a specialized OTP (one-time-password) input
feature. It offers a customizable input field count for the password, along with user-defined props and options for  
`autoFocus`, `autoSubmit`, `borderColor`, `highlightColor`, `textColor` and `backgroundColor`. The component is responsive,
meaning it is compatible with Android and iOS device browsers. Additionally, this 
extension supports autofill suggestions on mobile devices, which may vary based on the user's mobile or email service
provider, as well as the format of the email body send to the user's device.

The inspiration for this project came in part from the smooth checkout process experienced with [Stripe/Link payments](https://stripe.com/docs/payments/link).
Its integration is versatile, making it suitable for a variety of applications, such as:

1. Verification processes via email or mobile.
2. Authentication workflows through email/SMS or passwordless systems.
3. Two-factor authentication (2FA) for added security.
4. Secure online payment and transaction confirmation.
5. User registration and login procedures for web and mobile applications.
6. Quick response actions in interactive customer service tools.

<div align="center">
  <img src="./demo.gif" alt="Demo GIF">
</div>


## Demo 🚨

#### 🖥️️ A live demo of this component is hosted on GitHub pages and can be previewed by following [THIS LINK](https://pprunty.github.io/formik-otp-input/).

#### 🧑🏼‍💻 The source code used for the demo can be previewed by following [THIS LINK](https://github.com/pprunty/formik-otp-input/blob/main/demo/src/App.tsx).

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

## Usage 🔨

### Step 1: Import Necessary Modules
Start by importing React, Formik, Yup, and the OtpInput component:

```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OtpInput from 'formik-otp-input';
```

### Step 2: Define Your OTP Length
Set the length of your OTP. This will be used in the OtpInput component.

```jsx
const YOUR_OTP_LENGTH = 6; // Replace this with the length of your OTP
```

### Step 3:  

(Optional) Define CSS styles for your form elements. Adjust these styles according to your UI requirements.

```jsx
const formStyle = { /* ... */ };
const fieldStyle = { /* ... */ };
const errorTextStyle = { /* ... */ };
const submitButtonStyle = { /* ... */ };
```

### Step 4:

Create a functional component for your form. Within this component, you will use Formik's useFormik hook to handle form state and submission.

```jsx
const OtpForm = () => {
    // Formik hook
    const formik = useFormik({
        initialValues: {
            otp: '',
            // ... other form fields if you wish
        },
        onSubmit: (values) => {
            // Handle form submission
        },
    });

    // Return the form JSX
    return (
        <form style={formStyle} onSubmit={formik.handleSubmit}>
            {/* OtpInput component and other form elements go here */}
        </form>
    );
};
```

### Step 5: 

Integrate the OtpInput component into your form. Pass relevant props to customize its behavior and appearance.

```jsx
<OtpInput
    length={YOUR_OTP_LENGTH}
    value={formik.values.otp}
    inputType={"numeric"}    // Options: numeric, alphabetic, alphanumeric
    autoFocus={true}         // Auto-focus first digit
    autoSubmit={true}        // Auto-submit form on full OTP entry
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    onFullFill={formik.handleSubmit}
    setFieldError={formik.setFieldError}
    setFieldTouched={formik.setFieldTouched}
    highlightColor={'#4caf50'} // optional
    // ... other props and style overrides
    // textColor={'#FFFFFF'}
    // backgroundColor={'#FFFFFF'}
    // borderColor={'#FFFFFF'}
    // ... override any pre-existing styles if required
    // style={{
    //     'backgroundColor': '#ffc300'
    // }}
/>
```

### Step 6: Display Form Errors

(Optional) Add a section to display form validation errors related to the OTP field.

```jsx
{formik.errors.otp && formik.touched.otp && (
    <div style={errorTextStyle}>{formik.errors.otp}</div>
)}
```
### Step 7: Add a Submit Button

(Optional - if `autoSubmit` is disabled) Include a submit button to allow users to submit the form.

```jsx
<button type="submit" style={submitButtonStyle} >Submit</button>
```

### Step 8: Export the Form Component

Finally, export your OtpForm component.

```jsx
export default OtpForm;
```

### Full example


```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OtpInput from 'formik-otp-input';

const YOUR_OTP_LENGTH = 6; // Replace this with the length of your OTP


// CSS Styles, adjust according to your needs
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
    marginTop: '20px',
};

// Form component
const OtpForm = () => {
    const formik = useFormik({
        initialValues: {
            otp: '',
            // ... other form fields if you wish
        },
        onSubmit: (values) => {
            console.log('Form data:', values);
            window.alert(`Submitted otp value = ${values.otp}`);
            // Perform submission actions
        },
    });

    return (
        <form style={formStyle} onSubmit={formik.handleSubmit}>
            <OtpInput
                length={YOUR_OTP_LENGTH}
                value={formik.values.otp}
                inputType={"numeric"}    // Default is numeric. Options are numeric, alphabetic or alphanumeric
                autoFocus={true}    // Default is true. Will auto-focus first digit if true
                autoSubmit={true}    // Default is true. Will auto-submit form onFullFill
                onBlur={formik.handleBlur}   // Formik handler, used to handle onBlur events
                onChange={formik.handleChange}   // Formik handler, used to handle change events
                onFullFill={formik.handleSubmit}     // Formik handler, used to handle autoSubmit
                setFieldError={formik.setFieldError}     // Formik handler, used to handle error rendering
                setFieldTouched={formik.setFieldTouched}
                // ... other props you can pass
                highlightColor={'#4caf50'}
                // textColor={'#FFFFFF'}
                // backgroundColor={'#FFFFFF'}
                // borderColor={'#FFFFFF'}
                // ... override any pre-existing styles if required
                // style={{
                //     'backgroundColor': '#ffc300'
                // }}
            />
            {formik.errors.otp && formik.touched.otp && (
                <div style={errorTextStyle}>{formik.errors.otp}</div>
            )}
            <button type="submit" style={submitButtonStyle} >Submit</button>
        </form>
    );
};

export default OtpForm;
```

### Advanced Example
Typically, one-time-password flow is a two-step process. The first, involves providing an email or mobile number and 
making an API call to the backend to trigger the generation of the one-time-password. The second, involves providing the
OTP input field for the user to input before making a second API call to the server to validate the OTP. 

The following example details how to integration the Index component in such a two-step process:

```
todo: add example
```

## License 🎫

This project is licensed under the MIT License.
