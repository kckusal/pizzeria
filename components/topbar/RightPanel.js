import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  Flex,
  Stack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

import Link from "components/Link";
import { changeCurrency } from "redux/actions";

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
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const currency = useSelector(state => state.app.currency);
  const cartItemsCount = useSelector(state => state.cart.itemIds.length);

  const onChangeCurrency = code => {
    dispatch(changeCurrency(code));
  };

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

          <MenuList color="gray.700">
            {currency.allCodes.map(code => {
              const { label } = currency.optionsByCode[code];
              return (
                <MenuItem key={code} onClick={() => onChangeCurrency(code)}>
                  {label}
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
            {cartItemsCount}
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
