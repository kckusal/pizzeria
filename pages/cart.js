import { Flex, Stack, Button } from "@chakra-ui/react";

import AppContainer from "components/AppContainer";

function Cart() {
  return (
    <AppContainer>
      <Flex width="full" align="flex-start">
        <Stack width="full" height="200vh" py={6} px={2}>
          <Flex position="sticky" top="50px" py={6}>
            Proceed to checkout? (show in mobile)
          </Flex>

          <Flex>Cart Items</Flex>
        </Stack>

        <Stack
          width="full"
          maxWidth="300px"
          height="400px"
          boxShadow="1"
          position="sticky"
          top="80px"
          bg="white"
          px={4}
          py={6}
        >
          <Flex as="h2" fontSize="xl" fontWeight="500" justify="center">
            Checkout
          </Flex>

          <Stack height="full">
            <Stack>
              <Flex>Checkout form fill and button here...</Flex>
            </Stack>

            <Button colorScheme="primary" alignSelf="center" width="150px">
              Checkout Now
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </AppContainer>
  );
}

export default Cart;
