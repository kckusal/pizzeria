import { useEffect, useState, useRef } from "react";
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
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { debounce } from "lodash";

import Link from "components/Link";
import AppContainer from "components/AppContainer";
import Currency from "components/currency";
import { setQuantityInCart, removeMultipleFromCart } from "redux/actions";

function CartTableRow(props) {
  const { id, title, type, image, price } = props.data;

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
            value={price.value}
            sourceCurrencyCode={price.currencyCode}
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
            value={quantity * price.value}
            sourceCurrencyCode={price.currencyCode}
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
          onClick={() => {
            dispatch(removeMultipleFromCart([id]));
          }}
        />
      </Tooltip>
    </Flex>
  );
}

function CartTable({ setSubtotal, setSourceCurrencyCode }) {
  const cartItemIds = useSelector(state => state.cart.itemIds);
  const cartQuantityByItemId = useSelector(
    state => state.cart.quantityByItemId
  );
  const menuItemsById = useSelector(state => state.menu.itemsById);

  useEffect(() => {
    let subtotal = 0;
    let currencyCode = "";

    if (cartItemIds.length > 0 && menuItemsById) {
      cartItemIds.forEach(itemId => {
        subtotal =
          Number(subtotal) +
          parseInt(cartQuantityByItemId[itemId]) *
            Number(menuItemsById[itemId].price.value);

        if (!currencyCode) {
          currencyCode = menuItemsById[itemId].price.currencyCode;
        }
      });
    }

    setSubtotal(subtotal);
    setSourceCurrencyCode(currencyCode);
  }, [cartQuantityByItemId]);

  return (
    <Stack spacing={5}>
      {cartItemIds.map(itemId => (
        <CartTableRow key={itemId} data={menuItemsById[itemId]} />
      ))}

      {cartItemIds.length === 0 && <Flex>No items added in cart yet.</Flex>}
    </Stack>
  );
}

function CheckoutOrderForm({ setUserData = () => {} }) {
  const data = useRef({ firstName: "", lastName: "", address: "" });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: ""
  });

  const setError = (key, err) => {
    setErrors({ ...errors, [key]: err });
  };

  useEffect(() => {
    if (errors.firstName || errors.lastName || errors.address) {
      return;
    }

    setUserData(data.current);
  }, [errors]);

  return (
    <Stack>
      <Flex>
        <FormControl isRequired isInvalid={errors.firstName} pr={2}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            type="text"
            id="firstName"
            placeholder="John"
            onChange={debounce(e => {
              const value = String(e.target.value);
              let error;

              if (value.trim() === "") {
                error = "First name is required.";
              } else {
                if (!value.toLowerCase().match(/^[a-z][a-z]*$/)) {
                  error = "Name can contain only letters.";
                }
              }

              if (error) {
                setError("firstName", error);
              } else {
                setError("firstName", "");
                data.current.firstName = value;
              }
            }, 800)}
          />
          <FormErrorMessage>{errors.firstName}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.lastName} ml={2}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            type="text"
            id="lastName"
            placeholder="Doe"
            onChange={debounce(e => {
              const value = String(e.target.value);
              let error;

              if (value.trim() !== "") {
                if (!value.toLowerCase().match(/^[a-z][a-z]*$/)) {
                  error = "Name can contain only letters.";
                }
              }

              if (error) {
                setError("lastName", error);
              } else {
                setError("lastName", "");
                data.current.lastName = value;
              }
            }, 800)}
          />
          <FormErrorMessage>{errors.lastName}</FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isRequired isInvalid={errors.address}>
        <FormLabel htmlFor="address">Order Address</FormLabel>
        <Input
          type="text"
          id="address"
          placeholder="221B Baker Street"
          onChange={debounce(e => {
            const value = String(e.target.value);
            let error;

            if (value.trim() === "") {
              error = "Address is required.";
            }

            if (error) {
              setError("address", error);
            } else {
              setError("address", "");
              data.current.address = value;
            }
          }, 800)}
        />
        <FormErrorMessage>{errors.address}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}

function Cart() {
  const [subtotal, setSubtotal] = useState(0);
  const [sourceCurrencyCode, setSourceCurrencyCode] = useState(null);

  const deliveryCost = useSelector(state => state.constants.deliveryCost);

  const handleCheckout = e => {
    e.preventDefault();
  };

  return (
    <AppContainer>
      <Stack
        direction={{ base: "column", md: "row" }}
        width="full"
        height="full"
        minHeight="100vh"
        align={{ base: "center", md: "flex-start" }}
      >
        <Stack width="full" py={8} pr={{ base: 0, md: 8 }}>
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
            display={{ md: "none" }}
          >
            Proceed to checkout? (show in mobile)
          </Flex>

          <CartTable
            setSubtotal={setSubtotal}
            setSourceCurrencyCode={setSourceCurrencyCode}
          />
        </Stack>

        {subtotal > 0 && (
          <Stack
            as="form"
            noValidate
            onSubmit={handleCheckout}
            width="full"
            maxWidth="500px"
            minHeight="400px"
            boxShadow="1"
            position="sticky"
            top="90px"
            bg="white"
            px={4}
            py={6}
            id="checkout"
            ml={4}
            spacing={4}
          >
            <Heading as="h2" fontSize="2xl" textAlign="center">
              Checkout
            </Heading>

            <CheckoutOrderForm />

            <Stack spacing={3} fontSize="" height="full">
              <Flex justify="space-between">
                <Heading as="h3" fontSize="lg">
                  Subtotal
                </Heading>
                <Currency
                  value={subtotal}
                  sourceCurrencyCode={sourceCurrencyCode}
                />
              </Flex>

              <Flex justify="space-between">
                <Heading as="h3" fontSize="lg">
                  Delivery Fees
                </Heading>
                <Currency
                  value={deliveryCost.value}
                  sourceCurrencyCode={deliveryCost.currencyCode}
                />
              </Flex>

              <Flex justify="space-between" mb={2}>
                <Heading as="h3" fontSize="lg">
                  Total Cost
                </Heading>
                <Currency
                  value={Number(deliveryCost.value) + Number(subtotal)}
                  sourceCurrencyCode={sourceCurrencyCode}
                />
              </Flex>

              <Button
                type="submit"
                colorScheme="primary"
                alignSelf="center"
                width="150px"
              >
                Checkout Now
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </AppContainer>
  );
}

export default Cart;
