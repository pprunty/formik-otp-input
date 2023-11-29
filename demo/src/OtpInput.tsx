import React, {useState, useEffect, useRef, useMemo} from 'react';
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
  max-width: inherit;
  //align-items: center; // Optional, for vertical centering
  // Additional style for space between third and fourth input
  .extra-space {
    margin-right: 15px; // Adjust the space as needed
  }
`;

const hexToRgba = (hex: any, alpha = 1) => {
    let r: any = 0, g: any = 0, b: any = 0;
    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    return `rgba(${+r}, ${+g}, ${+b}, ${alpha})`;
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    textColor?: string;
    backgroundColor?: string;
    highlightColor?: string;
    borderColor?: string;
}

const Input = styled.input<InputProps>`
  width: 34px; // Larger width for easier tapping
  height: 38px; // Larger height for visibility
  margin: 0 6px; // Space between input boxes
  text-align: center;
  font-size: 20px;
  font-family: Monospaced, monospace;
  border: 1.5px solid ${props => (props.borderColor || '#ccc')};
  border-radius: 10px; // Rounded corners
  //caret-color: blue; // Visible caret color
  caret-color: transparent;
  color: ${props => props.textColor || '#000000'}; // Default to black if not provided
  background: ${props => props.backgroundColor || '#fff'};


  &[type='number'] {
    -moz-appearance: textfield; // For Firefox
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &:focus {
    border-color: ${props => props.highlightColor || '#ff8000'}; // Change border color on focus
    outline: none; // Remove default outline
    box-shadow: 0 0 5px ${props => props.highlightColor ? hexToRgba(props.highlightColor, 0.4) : 'rgba(218, 143, 82, 0.3)'}; // Use highlightColor for shadow
  }

  &::placeholder {
    color: #ced4da;
  }

  // Styles for error feedback
  &.error {
    border-color: #dc3545;
  }

  // Responsive design adjustments
  @media (max-width: 600px) {
    width: 30px;
    height: 42px;
  }
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
        const [hasAutoSubmitted, setHasAutoSubmitted] = useState<boolean>(false);

        // Custom hook for OTP validation
        useEffect(() => {
            const otpValue = localOtp.join('');
            if (hasUserStartedTyping) {
                validateOtp(otpValue, inputType, length, setFieldError);
            } else {
                setFieldError("otp", undefined); // Clear error initially
            }
        }, [localOtp, inputType, length, setFieldError, hasUserStartedTyping]);

        useEffect(() => {
            if (autoFocus && inputRefs.current[0]) {
                inputRefs.current[0].focus();
                setFieldTouched("otp", true);
            }
        }, [autoFocus, setFieldTouched]); // Include setFieldTouched in the dependency array

        const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
            // event.target.select();
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
            if (!hasUserStartedTyping) {
                setHasUserStartedTyping(true);
            }
            setFieldTouched("otp", true);

            const newValue = event.target.value.slice(-1); // Take the last character
            const currentOtpValue = localOtp[index];

            // Check if the new value is the same as the current value
            const isSameCharacter = newValue === currentOtpValue;

            // Update the state only if the value is different
            if (!isSameCharacter && newValue.length === 1 && isValidInput(newValue, inputType)) {
                const newOtp = [...localOtp];
                newOtp[index] = newValue;
                setLocalOtp(newOtp);

                onChange({
                    target: {
                        name: "otp",
                        value: newOtp.join('')
                    }
                } as React.ChangeEvent<HTMLInputElement>);
            }

            // Move focus to the next field if the input value is valid
            if (newValue.length === 1 && isValidInput(newValue, inputType) && index < length - 1) {
                const nextInput = inputRefs.current[index + 1];
                if (nextInput) {
                    nextInput.focus();
                    // nextInput.select();
                }
            } else if (autoSubmit && localOtp.join('').length === length && !hasAutoSubmitted) {
                onFullFill();
                setHasAutoSubmitted(true);
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
            } else if (e.key === "ArrowRight" && index < length - 1) {
                e.preventDefault()
                inputRefs.current[index + 1]?.focus();
            }
        };


        const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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
                    return 'number';
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
                            onKeyPress={e => handleKeyPress(e, index)}
                            onBlur={onBlur} // Use the onBlur prop
                            autoComplete={autoComplete}
                            className={isEvenLength && index === midpointIndex ? 'extra-space' : ''}
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            textColor={textColor}
                            onFocus={handleFocus}
                            backgroundColor={backgroundColor}
                            highlightColor={highlightColor}
                            borderColor={borderColor}
                        />
                        {isEvenLength && index === midpointIndex && <div className="spacer"></div>}
                    </>
                ))}
            </Container>
        );
    }
;

export default OtpInput;
