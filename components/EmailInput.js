import { Input } from "@chakra-ui/react";

function EmailInput({ onChange, onError, ...restProps }) {
  const handleChange = e => {
    const { value } = e.target;
    let error = "";

    console.log(value);

    const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(value).toLowerCase()
    );

    if (!isValid) {
      error = "Email should have valid example@xyz.abc format.";
    }

    // since all validations passed, pass the valid value to the handler
    if (error) {
      onError(error);
    } else {
      onChange(value);
    }
  };

  return <Input onChange={handleChange} {...restProps} />;
}

export default EmailInput;
