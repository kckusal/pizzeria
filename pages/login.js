import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";

import AppContainer from "components/AppContainer";
import PasswordInput from "components/PasswordInput";
import Link from "components/Link";

function Login() {
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

        <Stack pt={6} spacing={6} justify="center">
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" placeholder="j.doe@example.com" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <PasswordInput id="password" onChange={() => {}} />
          </FormControl>

          <Link href="#" mb={1} colorScheme="blue">
            Forgot Password ?
          </Link>
          <Button
            type="submit"
            colorScheme="primary"
            width="full"
            maxWidth="200px"
            alignSelf="center"
            mb={4}
          >
            Login
          </Button>
        </Stack>

        <Link href="/register" mt="0">
          Do not have an account yet? Click to register.
        </Link>
      </Stack>
    </AppContainer>
  );
}

export default Login;
