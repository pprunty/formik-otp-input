import React, {useState, createRef, ChangeEvent, KeyboardEvent, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  //align-items: center; // Optional, for vertical centering
`;

// Modify the Input styled component to remove cursor
const Input = styled.input`
  width: 35px;
  height: 35px;
  margin: 0 4px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  caret-color: transparent; // Remove cursor

  &:focus {
    background-color: #ffffff; // Example: light blue background
    border-color: #ff7418; // Example: blue border
    // You can add other styles like box-shadow, etc.
  }
`;

interface OtpInputProps {
    length: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFullFill: () => void;
    autoComplete?: string; // Add the autoComplete prop
    setFieldError: (field: string, message: string | undefined) => void; // Add this line
    setFieldTouched: (field: string, isTouched: boolean, shouldValidate?: boolean) => void; // Add this line
}

// todo: add autoSubmit field, colorHighlight field (optional), autoFocus, keyHandling
const OtpInput: React.FC<OtpInputProps> = ({
                                               length,
                                               value,
                                               onChange,
                                               onFullFill,
                                               autoComplete,
                                               setFieldError,
                                               setFieldTouched
                                           }) => {
    const [localOtp, setLocalOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs: React.RefObject<HTMLInputElement>[] = Array(length)
        .fill(null)
        .map(() => createRef<HTMLInputElement>());

    useEffect(() => {
        inputRefs[0].current?.focus();
    }, []);

    useEffect(() => {
        setLocalOtp(value.split('').concat(new Array(length - value.length).fill('')));
    }, [value, length]);

    const findFirstEmptyIndex = () => localOtp.findIndex((val) => val === '');

    useEffect(() => {
        // Focus the first empty field on component mount and value change
        const firstEmptyIndex = findFirstEmptyIndex();
        if (firstEmptyIndex !== -1) {
            inputRefs[firstEmptyIndex].current?.focus();
        }
    }, [localOtp]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!/^[0-9]$/i.test(event.key)) {
            event.preventDefault(); // Prevent non-numeric input
            // Check if the current input field is empty or not
            if (localOtp[index] === '') {
                setFieldError("otp", "Only numeric digits are allowed.");
            }
        } else {
            setFieldError("otp", undefined); // Clear error for valid input
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setFieldTouched("otp", true);
        const newOtp = [...localOtp];
        // Capture the last character entered; useful if the user pastes a digit
        const newValue = event.target.value.slice(-1);

        // Update only if it's a numeric digit
        if (/^[0-9]$/i.test(newValue)) {
            newOtp[index] = newValue;
            setLocalOtp(newOtp);

            // Update the form value
            onChange({
                target: {
                    name: "otp",
                    value: newOtp.join('')
                }
            } as React.ChangeEvent<HTMLInputElement>);

            // Auto-move focus to the next input field if this is not the last one
            if (index < length - 1) {
                inputRefs[index + 1].current?.focus();
            }
        }

        // Check if all fields are filled
        const firstEmptyIndex = findFirstEmptyIndex();
        if (firstEmptyIndex !== -1 && firstEmptyIndex !== index + 1) {
            inputRefs[firstEmptyIndex].current?.focus();
        }
        const isFullFilled = newOtp.every((val) => val !== '');
        if (isFullFilled) {
            onFullFill();
        }
        setFieldError("otp", undefined); // Clear error for valid input
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            e.preventDefault(); // Prevent the default backspace behavior

            // If the current field is empty, clear the previous field and move focus
            if (localOtp[index] === '' && index > 0) {
                const newOtp = [...localOtp];
                newOtp[index - 1] = ''; // Clear the previous field
                setLocalOtp(newOtp);

                // Update the form value
                onChange({
                    target: {
                        name: "otp",
                        value: newOtp.join('')
                    }
                } as React.ChangeEvent<HTMLInputElement>);

                // Move focus to the previous field
                inputRefs[index - 1].current?.focus();
            } else if (localOtp[index] !== null) {
                const newOtp = [...localOtp];
                newOtp[index] = ''; // Clear the current field
                setLocalOtp(newOtp); // update the newOtp

                // Update the form value
                // onChange({
                //     target: {
                //         name: "otp",
                //         value: newOtp.join('')
                //     }
                // } as React.ChangeEvent<HTMLInputElement>);

                // Move focus to the previous field
                // inputRefs[index - 1].current?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs[index + 1].current?.focus();
        }
        setFieldError("otp", undefined); // Clear error for valid input
    };

    return (
        <Container>
            {localOtp.map((data, index) => (
                <Input
                    key={index}
                    inputMode="numeric"
                    maxLength={1}
                    value={data}
                    ref={inputRefs[index]}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    autoComplete={autoComplete || "one-time-code"} // Apply the autoComplete prop to each input
                />
            ))}
        </Container>
    );
};

export default OtpInput;
