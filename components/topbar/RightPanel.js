import { useRouter } from "next/router";

import { Flex, Stack, Box } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

import Link from "components/Link";

function TopbarButton({ children, ...rest }) {
  return (
    <Flex
      justify="center"
      align="center"
      height="full"
      _hover={{ bg: "gray.800", textDecoration: "none" }}
      cursor="pointer"
      _focus={{ boxShadow: "inset 0 0 0 3px rgba(66,153,225,0.6) !important;" }}
      transition="background-color .3s linear"
      {...rest}
    >
      {children}
    </Flex>
  );
}

function RightPanel() {
  const { pathname } = useRouter();

  return (
    <Flex width="full" height="full" justify="flex-end" align="stretch">
      <TopbarButton as={Link} href="/cart" width="60px">
        <Box position="relative" fontSize="xl">
          <Flex
            bg="gray.100"
            color="gray.800"
            width="auto"
            minWidth="16px"
            minHeight="16px"
            fontSize="0.8rem"
            fontWeight="500"
            borderRadius="full"
            position="absolute"
            top="-8px"
            left="16px"
            px={1}
            justify="center"
            align="center"
          >
            5
          </Flex>

          <FiShoppingCart />
        </Box>
      </TopbarButton>

      <TopbarButton px={2} as={Link} href="/login">
        <BiUserCircle size="25" />

        <Stack spacing="-2px" fontSize="0.8rem" ml={1}>
          <Flex fontWeight="500">You're a guest.</Flex>
          {pathname !== "/login" && <Flex>Click to log in.</Flex>}
        </Stack>
      </TopbarButton>
    </Flex>
  );
}

export default RightPanel;
