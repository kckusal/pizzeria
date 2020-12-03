import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button
} from "@chakra-ui/react";

import useUser from "redux/hooks/user";
import AppContainer from "components/AppContainer";
import EmailInput from "components/EmailInput";
import PasswordInput from "components/PasswordInput";
import Link from "components/Link";
import { addToast } from "redux/actions";

function LoginButton() {
  const { authInProgress } = useUser();

  return (
    <Button
      type="submit"
      isDisabled={authInProgress}
      isLoading={authInProgress}
      loadingText="Authenticating"
      colorScheme="primary"
      width="full"
      maxWidth="200px"
      alignSelf="center"
      mb={4}
    >
      Login
    </Button>
  );
}

function Login() {
  const dispatch = useDispatch();
  const { login } = useUser();

  const data = useRef({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const setError = (key, error) => {
    setErrors({ ...errors, [key]: error });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!data.current.email || !data.current.password) {
      if (!data.current.email) {
        setError("email", "Email is required.");
      }
      if (!data.current.password) {
        setError("password", "Password is required.");
      }

      dispatch(
        addToast({
          status: "error",
          title: "Form data invalid.",
          description: "Please fill all login fields properly first."
        })
      );
    } else {
      setErrors({ email: "", password: "" });
      // there's email and password, so continue
      await login(data.current.email, data.current.password);
    }
  };

  return (
    <AppContainer height="full" py={8}>
      <Stack
        bg="white"
        width="full"
        maxWidth="400px"
        mx="auto"
        py={6}
        px={8}
        boxShadow="2"
      >
        <Heading as="h2" fontSize="2xl" textAlign="center" py={4}>
          Login
        </Heading>

        <Stack
          as="form"
          noValidate
          pt={6}
          spacing={6}
          justify="center"
          onSubmit={handleSubmit}
        >
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

          <FormControl isRequired isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <PasswordInput
              id="password"
              onChange={value => {
                data.current.password = "";
                if (value.trim() === "") {
                  setError("password", "Password is required.");
                } else {
                  data.current.password = value;
                  setError("password", "");
                }
              }}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Link
            href="/login#"
            mb={1}
            colorScheme="blue"
            onClick={e => {
              e.preventDefault();

              dispatch(
                addToast({
                  status: "info",
                  title: "Missing",
                  description: "This feature is yet to be added. :("
                })
              );
            }}
          >
            Forgot Password ?
          </Link>

          <LoginButton />
        </Stack>

        <Link href="/register" mt="0" color="blue.500">
          Do not have an account yet? Click to register.
        </Link>
      </Stack>
    </AppContainer>
  );
}

export default Login;
