import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Button,
  Image,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";

import Link from "components/Link";
import AppContainer from "components/AppContainer";
import Currency from "components/currency";
import { setQuantityInCart } from "redux/actions";

function CartTableRow(props) {
  const { id, title, type, image, price, currencyCode } = props.data;

  const dispatch = useDispatch();

  const placeholderImageUrl = useSelector(
    state => state.constants.placeholderImageUrl
  );

  const quantity = useSelector(state => state.cart.quantityByItemId[id]);

  const handleQuantityChange = (_, valueAsNum) => {
    dispatch(setQuantityInCart(id, valueAsNum));
  };

  return (
    <Flex
      align="center"
      bg="white"
      width="full"
      height="80px"
      boxShadow={0}
      role="group"
      overflow="hidden"
      transition="box-shadow 0.3s linear"
      _hover={{ boxShadow: 1 }}
      zIndex="0"
    >
      <Flex align="center" justify="center" overflow="hidden">
        <Image
          src={image}
          maxWidth="120px"
          objectFit={"scale-down"}
          bg="gray.100"
          fallbackSrc={placeholderImageUrl}
          transition="filter 0.3s linear, transform 0.3s linear"
          zIndex={1}
          _groupHover={{ filter: "brightness(0.8)", transform: "scale(1.2)" }}
        />
      </Flex>

      <Stack width="full" px={3} py={2}>
        <Flex fontSize="1.1rem">{title}</Flex>

        <Flex align="center">
          <Currency
            value={price}
            sourceCurrencyCode={currencyCode}
            fontWeight="bold"
            width="100px"
            justify="center"
          />

          <Box as="span" mx={2}>
            ×
          </Box>

          <NumberInput
            size="sm"
            maxWidth="70px"
            mx={2}
            defaultValue={quantity}
            min={1}
            max={10}
            onChange={handleQuantityChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Box as="span" mx={2}>
            =
          </Box>

          <Currency
            value={quantity * price}
            sourceCurrencyCode={currencyCode}
            fontWeight="bold"
            width="100px"
            justify="center"
          />
        </Flex>
      </Stack>

      <Tooltip label="Remove from Cart" hasArrow arrowSize={8}>
        <IconButton
          m={4}
          icon={<RiDeleteBin5Line />}
          variant="ghost"
          fontSize="2xl"
        />
      </Tooltip>
    </Flex>
  );
}

function CartTable() {
  const cartItemIds = useSelector(state => state.cart.itemIds);
  const menuItemsById = useSelector(state => state.menu.itemsById);

  return (
    <Stack spacing={5}>
      {cartItemIds.map(itemId => (
        <CartTableRow key={itemId} data={menuItemsById[itemId]} />
      ))}
    </Stack>
  );
}

function Cart() {
  return (
    <AppContainer>
      <Flex width="full" align="flex-start">
        <Stack width="full" height="200vh" py={8} px={2}>
          <Heading as="h1" fontSize="2xl" mb={3}>
            Manage Cart Items
          </Heading>
          <Flex
            as={Link}
            href="#checkout"
            position="sticky"
            top="50px"
            py={2}
            background="#eee"
            zIndex="sticky"
          >
            Proceed to checkout? (show in mobile)
          </Flex>

          <CartTable />
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
          id="checkout"
          ml={4}
        >
          <Flex as="h2" fontSize="xl" fontWeight="500" justify="center">
            Checkout
          </Flex>

          <Stack height="full">
            <Stack>
              <Flex>Checkout form fill and button here...</Flex>
            </Stack>

            <Flex>Subtotal Row</Flex>
            <Flex>Delivery Charges</Flex>
            <Flex>Total</Flex>
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
