import { useState } from "react";

import { Button, Input, InputRightElement } from "@chakra-ui/react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const PasswordInput = ({
  onChange = () => {},
  onError = () => {},
  minLength,
  maxLength,
  alphanumeric,
  minOneUppercasePresent,
  customValidateError = () => {},
  ...restProps
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = e => {
    const value = String(e.target.value);
    let error = "";
    console.log(value, minLength);

    if (minLength && value.length < minLength) {
      error = `Password should be at least ${minLength} characters long.`;
    } else {
      if (maxLength && value.length > maxLength) {
        error = `Password should not be more than ${maxLength} characters.`;
      } else {
        if (alphanumeric) {
          if (value.match(/^[A-Za-z]+$/i)) {
            error = `Password contains only alphabets. At least one number or other special character is required.`;
          } else {
            if (value.match(/^[0-9]+$/i)) {
              error = `Password contains only numbers. At least one alphabet or other special character is required.`;
            } else {
              if (
                minOneUppercasePresent &&
                !value.match(/(.*[A-Z])|([A-Z].*)/i)
              ) {
                error = `Password should contain at least one uppercase character.`;
              }
            }
          }
        }
      }
    }

    if (!error && typeof customValidateError !== "undefined") {
      error = customValidateError(value);
    }

    if (error) {
      onError(error);
    } else {
      onChange(value);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Input
        width="full"
        type={passwordShown ? "text" : "password"}
        placeholder="jds*(3#,2aFBI.isf8"
        onChange={handleChange}
        {...restProps}
        pr="4rem"
      />

      <InputRightElement width="3rem" height="full">
        <Button
          h="1.4rem"
          px={0}
          size="sm"
          fontSize="lg"
          variant="ghost"
          onClick={() => setPasswordShown(!passwordShown)}
        >
          {passwordShown ? <BsEye /> : <BsEyeSlash />}
        </Button>
      </InputRightElement>
    </div>
  );
};

export default PasswordInput;
