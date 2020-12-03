import { useRouter } from "next/router";

import {
  Flex,
  Stack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { GrHistory } from "react-icons/gr";

import useAppSettings from "redux/hooks/app";
import useUser from "redux/hooks/user";
import useCart from "redux/hooks/cart";
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

function UserPart() {
  const { authenticated, data: userData } = useUser();
  const { pathname } = useRouter();

  return (
    <TopbarButton px={2} as={Link} href={authenticated ? "/logout" : "/login"}>
      <BiUserCircle size="25" />

      <Stack spacing="-2px" fontSize="0.8rem" ml={1} width="90px" isTruncated>
        <Box fontWeight="500" width="90px" isTruncated>
          {authenticated ? `${userData.email}` : "You're a guest."}
        </Box>
        {typeof window !== "undefined" &&
          !["/login", "/logout"].includes(pathname) && (
            <Flex>Click to log {authenticated ? "out" : "in"}.</Flex>
          )}
      </Stack>
    </TopbarButton>
  );
}

function RightPanel() {
  const { pathname } = useRouter();

  const { currency, changeCurrency } = useAppSettings();
  const { count } = useCart();
  const { authenticated } = useUser();

  return (
    <Flex width="full" height="full" justify="flex-end" align="stretch">
      {!["/login", "/register"].includes(pathname) && (
        <Menu isLazy arrowSize={4}>
          <TopbarButton>
            <MenuButton
              height="full"
              width="60px"
              px={3}
              textTransform="uppercase"
            >
              {currency.currentCode}
            </MenuButton>
          </TopbarButton>

          <MenuList color="gray.700" boxShadow={6}>
            {currency.allCodes.map(code => {
              const { label, symbol } = currency.optionsByCode[code];
              return (
                <MenuItem key={code} onClick={() => changeCurrency(code)}>
                  {label} - {symbol}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}

      <TopbarButton as={Link} href="/cart" width="60px">
        <Box position="relative" fontSize="xl" ml={-2}>
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
            pl={0}
            justify="center"
            align="center"
          >
            {count}
          </Flex>

          <FiShoppingCart />
        </Box>
      </TopbarButton>

      {authenticated && (
        <TopbarButton as={Link} href="/orders" width="50px">
          <Stack spacing="0" fontSize="xs" align="center" pt={1}>
            <FaHistory size={18} />
            <Flex>Orders</Flex>
          </Stack>
        </TopbarButton>
      )}

      <UserPart />
    </Flex>
  );
}

export default RightPanel;
