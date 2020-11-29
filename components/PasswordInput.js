import { useState } from "react";

import { Button, Input, InputRightElement } from "@chakra-ui/react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const PasswordInput = ({ onChange, ...restProps }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Input
        width="full"
        type={passwordShown ? "text" : "password"}
        placeholder="jds*(3#,2aFBI.isf8"
        onChange={onChange}
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
