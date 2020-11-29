import { useState, useRef } from "react";

import {
  Heading,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button
} from "@chakra-ui/react";
import { debounce } from "lodash";

import AppContainer from "components/AppContainer";
import EmailInput from "components/EmailInput";
import PasswordInput from "components/PasswordInput";
import Link from "components/Link";

function PasswordSet({ onChange = () => {}, ...rest }) {
  const password = useRef("");
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });

  return (
    <Flex>
      <FormControl isRequired pr={2} isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <PasswordInput
          id="password"
          minLength={3}
          maxLength={16}
          alphanumeric={true}
          minOneUppercasePresent
          onChange={value => {
            setErrors({ ...errors, password: "" });
            password.current = value;
          }}
          onError={err => {
            setErrors({ ...errors, password: err });
          }}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        ml={2}
        isDisabled={errors.password}
        isInvalid={errors.confirmPassword}
      >
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <PasswordInput
          id="confirmPassword"
          customValidateError={value => {
            if (value === password.current) return;

            return "Password mismatch.";
          }}
          onChange={value => {
            setErrors({ ...errors, confirmPassword: "" });
            onChange(value);
          }}
          onError={err => {
            setErrors({ ...errors, confirmPassword: err });
          }}
        />
        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
      </FormControl>
    </Flex>
  );
}

function Register() {
  const data = useRef({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: ""
  });

  const setError = (key, error) => {
    setErrors({ ...errors, [key]: error });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <AppContainer height="full" py={8}>
      <Stack
        bg="white"
        width="full"
        maxWidth="600px"
        mx="auto"
        py={6}
        px={8}
        boxShadow="2"
      >
        <Heading as="h2" fontSize="2xl" textAlign="center" py={4}>
          Register
        </Heading>

        <Stack
          as="form"
          noValidate
          onSubmit={handleSubmit}
          pt={6}
          spacing={6}
          justify="center"
        >
          <Flex>
            <FormControl isRequired pr={2} isInvalid={errors.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                type="text"
                id="firstName"
                placeholder="John"
                onChange={debounce(e => {
                  const value = String(e.target.value);
                  let error;

                  if (!value) {
                    error = "First name is required.";
                  } else {
                    if (!value.match(/^[a-z][a-z]*$/)) {
                      error = "First name can contain only letters.";
                    }
                  }

                  console.log(value, error);
                  if (error) {
                    setError("firstName", error);
                  } else {
                    data.current.firstName = value;
                    setError("firstName", "");
                  }
                }, 800)}
              />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>

            <FormControl ml={2} isInvalid={errors.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                type="text"
                id="lastName"
                placeholder="Doe"
                onChange={debounce(e => {
                  const value = String(e.target.value);
                  let error;

                  if (value.trim() !== "") {
                    if (!value.match(/^[a-z][a-z]*$/)) {
                      error = "Last name can contain only letters.";
                    }
                  }

                  if (error) {
                    setError("lastName", error);
                  } else {
                    data.current.lastName = value;
                    setError("lastName", "");
                  }
                }, 800)}
              />
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>
          </Flex>

          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <EmailInput
              type="email"
              id="email"
              placeholder="j.doe@example.com"
              onChange={value => {
                data.current.email = value;
                setError("email", "");
              }}
              onError={err => {
                setError("email", err);
              }}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <PasswordSet
            onChange={value => {
              data.current.password = value;
            }}
          />

          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              type="text"
              id="address"
              onChange={() => {}}
              placeholder="22B Baker Street, London, United Kingdom"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="primary"
            width="full"
            maxWidth="200px"
            alignSelf="center"
            mb={4}
          >
            Create Account
          </Button>
        </Stack>

        <Link href="/login" mt="0" color="blue.500">
          Already have an account? Click to login.
        </Link>
      </Stack>
    </AppContainer>
  );
}

export default Register;
