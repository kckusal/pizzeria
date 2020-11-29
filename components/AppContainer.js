import { Flex } from "@chakra-ui/react";

export default function AppContainer({ children, ...restProps }) {
  return (
    <Flex
      width="full"
      maxWidth={900}
      mx="auto"
      px={4}
      bg="blue.5"
      {...restProps}
    >
      {children}
    </Flex>
  );
}
