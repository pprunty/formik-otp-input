import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

const createOtpSchema = (inputType: string, length: number): Yup.StringSchema => {
    const regexMap: { [key: string]: RegExp } = {
        alphanumeric: /^[a-zA-Z0-9]*$/,
        alphabetic: /^[a-zA-Z]*$/,
        numeric: /^[0-9]*$/
    };

    const regex = regexMap[inputType] || regexMap.numeric;

    return Yup.string()
        .matches(regex, `Only ${inputType} characters are allowed`)
        .required("Please fill in all OTP fields before submitting")
        .length(length, `OTP must be exactly ${length} characters long`);
};

const isValidInput = (value: string, inputType: string): boolean => {
    const regexMap: { [key: string]: RegExp } = {
        alphanumeric: /^[a-z0-9]$/i,
        alphabetic: /^[a-z]$/i,
        numeric: /^[0-9]$/i
    };

    return regexMap[inputType]?.test(value) || false;
};

const validateOtp = async (otpValue: string, inputType: string, length: number, setFieldError: (field: string, message: string | undefined) => void) => {
    const otpSchema = createOtpSchema(inputType, length);
    try {
        await otpSchema.validate(otpValue);
        setFieldError("otp", undefined); // Clear any previous error
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            setFieldError("otp", err.message); // Set the validation error
        }
    }
};

interface OtpInputProps {
    length: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFullFill: () => void;
    autoComplete?: string; // Add the autoComplete prop
    setFieldError: (field: string, message: string | undefined) => void; // Add this line
    setFieldTouched: (field: string, isTouched: boolean, shouldValidate?: boolean) => void; // Add this line
    autoFocus?: boolean; // Add autoFocus prop
    autoSubmit?: boolean; // Add autoSubmit prop
    inputType?: string | 'alphanumeric' | 'numeric' | 'alphabetic'; // Add inputType prop
    onBlur: (e: React.FocusEvent<any>) => void;
    textColor?: string;
    backgroundColor?: string;
    highlightColor?: string;
    borderColor?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 90%;

  //.extra-space {
  //  margin-right: 15px; // Adjust the space as needed
  //}
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    textColor?: string;
    backgroundColor?: string;
    highlightColor?: string;
    borderColor?: string;
}

const Input = styled.input<InputProps>`
  width: 34px;
  height: 43px;
  margin: 0 4px;
  text-align: center;
  font-size: 20px;
  font-family: Monospaced, monospace;
  border: 1.5px solid ${props => (props.borderColor || '#DDDDDD')};
  border-radius: 8px;
  caret: block;
  color: ${props => props.textColor || '#000000'};
  background: ${props => props.backgroundColor || '#fff'};
  box-shadow: 0.25px 0.5px 1px 0 rgb(229, 229, 229);
  transition: background-color 0.3s, border-color 0.1s;


  &[type='number'] {
    -moz-appearance: textfield; // For Firefox
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &:focus {
    border-color: ${props => props.highlightColor || '#ff8000'};
    outline: none;
  }

  &::placeholder {
    color: #ced4da;
  }

  &.error {
    border-color: #dc3545;
  }

  @media (max-width: 600px) {
    width: 26px;
    height: 40px;
  }
`;

const Spacer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #DDDDDD;
  margin-right: 3px;
  margin-left: 3px;
`;

const OtpInput: React.FC<OtpInputProps> = ({
                                               length,
                                               onChange,
                                               onFullFill,
                                               autoComplete = "one-time-code",
                                               onBlur,
                                               setFieldError,
                                               setFieldTouched,
                                               inputType = 'numeric',
                                               autoFocus = true,
                                               autoSubmit = true,
                                               textColor,
                                               backgroundColor,
                                               highlightColor,
                                               borderColor
                                           }) => {
        const [localOtp, setLocalOtp] = useState<string[]>(new Array(length).fill(''));
        const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));
        const [hasUserStartedTyping, setHasUserStartedTyping] = useState<boolean>(false);

        // Custom hook for OTP validation
        useEffect(() => {
            const otpValue = localOtp.join('');
            if (hasUserStartedTyping) {
                validateOtp(otpValue, inputType, length, setFieldError);
            } else {
                setFieldError("otp", undefined);
            }
        }, [localOtp, inputType, length, setFieldError, hasUserStartedTyping]);

        useEffect(() => {
            if (autoFocus && inputRefs.current[0]) {
                inputRefs.current[0].focus();
                setFieldTouched("otp", true);
            }
        }, [autoFocus, setFieldTouched]); // Include setFieldTouched in the dependency array

        const resetOtp = () => {
            setLocalOtp(new Array(length).fill(''));
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
                setFieldTouched("otp", true);
            }
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
            if (!hasUserStartedTyping) {
                setHasUserStartedTyping(true);
            }
            setFieldTouched("otp", true);

            const newValue = event.target.value.slice(-1); // Take the last character
            const newOtp = [...localOtp];
            newOtp[index] = newValue;

            // Update state with the new OTP value
            setLocalOtp(newOtp);

            const isOtpComplete = newOtp.every(val => val.length === 1);

            if (isOtpComplete) {
                // Manually update Formik values
                onChange({
                    target: {
                        name: "otp",
                        value: newOtp.join('')
                    }
                } as React.ChangeEvent<HTMLInputElement>);

                if (autoSubmit) {
                    onFullFill();
                    resetOtp()
                }
            }

            // Move focus or handle auto-submit
            if (newValue.length === 1 && isValidInput(newValue, inputType)) {
                setFieldError("otp", undefined); // Clear any previous error
                if (index < length - 1) {
                    // Move focus to the next field if not the last one
                    inputRefs.current[index + 1]?.focus();
                    // todo: only do this on desktop but fix same character not update issue
                    // inputRefs.current[index + 1]?.select();
                }
            }
        };


        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === "Backspace") {
                e.preventDefault();
                if (localOtp[index] === '' && index > 0) {
                    const newOtp = [...localOtp];
                    newOtp[index - 1] = '';
                    setLocalOtp(newOtp);
                    onChange({
                        target: {
                            name: "otp",
                            value: newOtp.join('')
                        }
                    } as React.ChangeEvent<HTMLInputElement>);
                    inputRefs.current[index - 1]?.focus();
                } else {
                    const newOtp = [...localOtp];
                    newOtp[index] = '';
                    setLocalOtp(newOtp);
                }
            } else if (e.key === "ArrowLeft" && index > 0) {
                e.preventDefault()
                inputRefs.current[index - 1]?.focus();
                // todo: only do this on desktop but fix same character not update issue
                // inputRefs.current[index - 1]?.select();
            } else if (e.key === "ArrowRight" && index < length - 1) {
                e.preventDefault()
                inputRefs.current[index + 1]?.focus();
            }
        };


        const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const isFullFilled = localOtp.every((val) => val !== '');
                if (isFullFilled) {
                    onFullFill();
                } else {
                    setFieldError("otp", "Please fill in all OTP fields before submitting.");
                }
            } else if (!isValidInput(event.key, inputType)) {
                event.preventDefault();
                setFieldError("otp", `Only ${inputType} characters are allowed.`);
            }
        };

        const getInputType = (inputType: string): string => {
            switch (inputType) {
                case 'alphanumeric':
                case 'alphabetic':
                    return 'text';
                case 'numeric':
                    return 'tel';
                default:
                    return 'text';
            }
        };

        const isEvenLength = length % 2 === 0;
        const midpointIndex = length % 2 === 0 ? (length / 2) - 1 : null;


        return (
            <Container>
                {localOtp.map((data, index) => (
                    <>
                        <Input
                            name="otp"
                            type={getInputType(inputType)} // Set the type dynamically
                            key={index}
                            maxLength={1}
                            value={data}
                            ref={el => inputRefs.current[index] = el}
                            onChange={e => handleChange(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            onKeyPress={e => handleKeyPress(e)}
                            onBlur={onBlur} // Use the onBlur prop
                            autoComplete={autoComplete}
                            className={isEvenLength && index === midpointIndex ? 'extra-space' : ''}
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            textColor={textColor}
                            backgroundColor={backgroundColor}
                            highlightColor={highlightColor}
                            borderColor={borderColor}
                            // style={{
                            //     'backgroundColor': '#ffc300'
                            // }}
                        />
                        {isEvenLength && index === midpointIndex && <Spacer>-</Spacer>}
                    </>
                ))}
            </Container>
        );
    }
;

export default OtpInput;
