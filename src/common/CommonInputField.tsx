/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';

interface InputProps {
  onChangeData: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  type: string;
  hint: string;
  width?: string;
  height?: string;
  bgColor?: string;
  disable?: boolean;
  maxCharacterlength?: number;
  value?: string; // Add value prop
}

const CommonInputField: React.FC<InputProps> = ({
  onChangeData,
  inputRef,
  type,
  hint,
  width,
  height,
  bgColor,
  disable,
  maxCharacterlength,
  value, // Destructure value prop
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      if (maxCharacterlength != null && inputValue.length > maxCharacterlength) {
        return;
      }

      onChangeData(inputValue);
    },
    [onChangeData, maxCharacterlength]
  );

  const autofillStyles = {
    WebkitTransition: 'background-color 5000s ease-in-out 0s',
    backgroundColor: '#fff',
    color: '#000',
  };

  useEffect(() => {
    // Set the initial value of the input field
    if (inputRef.current) {
      inputRef.current.value = value!;
    }
  }, [inputRef, value]);

  return (
    <input
      ref={inputRef}
      onChange={handleChange}
      placeholder={hint}
      type={type}
      disabled={disable == null ? false : disable}
      maxLength={maxCharacterlength}
      style={autofillStyles}
      className={`placeholder:text-hintColor ${
        width == null ? 'w-96' : width
      } ${height == null ? 'h-10' : height}  rounded-[4px]  ${
        bgColor == null ? 'appearance-none bg-transparent' : bgColor
      } border-[0.5px] border-borderColor  focus:outline-none px-2 placeholder:font-mon placeholder:text-sm text-midBlack placeholder:text-graishColor`}
    />
  );
};

export default CommonInputField;
