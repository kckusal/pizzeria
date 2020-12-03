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
  Input,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { debounce } from "lodash";

import useAppSettings from "redux/hooks/app";
import useCart from "redux/hooks/cart";
import useUser from "redux/hooks/user";
import Link from "components/Link";
import AppContainer from "components/AppContainer";
import Currency from "components/currency";
import DetailedItemModalOnClick from "components/menu-item-card/DetailedModal";
import { addToast, checkoutFailed } from "redux/actions";

function CartTableRow(props) {
  const { _id, title, image, price } = props.data;

  const placeholderImageUrl = useSelector(
    state => state.constants.placeholderImageUrl
  );

  const { getQuantity, setQuantity, removeFromCart } = useCart();
  const quantity = getQuantity(_id);

  const handleQuantityChange = debounce((_, valueAsNum) => {
    setQuantity(_id, valueAsNum);
  }, 1000);

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
      <DetailedItemModalOnClick id={_id}>
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
      </DetailedItemModalOnClick>

      <Stack width="full" px={3} py={2}>
        <DetailedItemModalOnClick id={_id}>
          <Flex fontSize="1.1rem">{title}</Flex>
        </DetailedItemModalOnClick>

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
            removeFromCart(_id);
          }}
        />
      </Tooltip>
    </Flex>
  );
}

function CartTable({ setSubtotal, setSourceCurrencyCode }) {
  const { cart, itemIds, count } = useCart();

  const menuItemsById = useSelector(state => state.menu.itemsById);

  useEffect(() => {
    let subtotal = 0;
    let currencyCode = "";

    if (count > 0 && menuItemsById) {
      itemIds.forEach(itemId => {
        subtotal =
          Number(subtotal) +
          parseInt(cart[itemId]) * Number(menuItemsById[itemId].price.value);

        if (!currencyCode) {
          currencyCode = menuItemsById[itemId].price.currencyCode;
        }
      });
    }

    setSubtotal(subtotal);
    setSourceCurrencyCode(currencyCode);
  }, [cart]);

  return (
    <Stack minHeight="100vh" width="500px" spacing={5} mt={6}>
      {itemIds.map(itemId => (
        <CartTableRow key={itemId} data={menuItemsById[itemId]} />
      ))}

      {count === 0 && (
        <>
          <Flex align="center" wrap="wrap" fontSize="xl">
            No items added in cart yet.
            <Button
              variant="link"
              display="inline"
              as={Link}
              href="/menu"
              colorScheme="blue"
              mx={3}
              fontSize="lg"
            >
              Explore menu now.
            </Button>
          </Flex>
        </>
      )}
    </Stack>
  );
}

function CheckoutOrderForm({ setUserData = () => {} }) {
  const { authenticated, data: authUser } = useUser();
  const data = useRef({
    firstName: authUser?.firstName || "",
    lastName: authUser?.lastName || "",
    address: authUser?.address || ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: ""
  });

  const setError = (key, err) => {
    setErrors({ ...errors, [key]: err });
  };

  useEffect(() => {
    console.log("Checkout order form error", errors);

    if (errors.firstName || errors.lastName || errors.address) {
      setUserData({ firstName: "", lastName: "", address: "" });
    } else {
      setUserData(data.current);
    }
  }, [errors]);

  return (
    <Stack width="full">
      <Flex>
        <FormControl isRequired isInvalid={errors.firstName} pr={2}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            type="text"
            id="firstName"
            placeholder="John"
            defaultValue={authenticated ? authUser?.firstName : ""}
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
            defaultValue={authenticated ? authUser?.lastName : ""}
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
          defaultValue={authenticated ? authUser?.address : ""}
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

function ClearCartButton() {
  const { clearCart } = useCart();
  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" variant="outline" colorScheme="red" onClick={onOpen}>
        Clear Cart
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        preserveScrollBarGap
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Clear Cart
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will remove all items from cart.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                ml={3}
              >
                Yes, remove all cart items.
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function CartPage() {
  const dispatch = useDispatch();

  const { currency, convertCurrency } = useAppSettings();
  const { checkout } = useCart();
  const deliveryCost = useSelector(state => state.constants.deliveryCost);

  const [subtotal, setSubtotal] = useState(0);
  const [sourceCurrencyCode, setSourceCurrencyCode] = useState(null);
  const userData = useRef({ firstName: "", lastName: "", address: "" });

  const handleCheckout = e => {
    e.preventDefault();

    const { firstName, lastName, address } = userData.current;

    if (firstName && address) {
      console.log(userData.current);

      const deliveryCostInUsd = Number(
        convertCurrency(deliveryCost, "usd").value
      );
      const totalCostInUsd =
        Number(deliveryCostInUsd) +
        parseFloat(
          convertCurrency(
            {
              value: Number(subtotal),
              currencyCode: sourceCurrencyCode
            },
            "usd"
          ).value
        );
      console.log("TOtal cost", subtotal, totalCostInUsd);

      checkout("usd", deliveryCostInUsd, totalCostInUsd);
    } else {
      dispatch(
        addToast({
          status: "error",
          description: "Please enter a name & address for the order."
        })
      );
    }
  };

  return (
    <AppContainer>
      <Stack width="full" height="full" minHeight="100vh">
        <Flex justify="space-between" pr={2} mt={8}>
          <Heading as="h1" fontSize="2xl" mb={3}>
            Manage Cart Items
          </Heading>

          {subtotal > 0 && <ClearCartButton />}
        </Flex>
        {subtotal > 0 && (
          <Flex
            as={Link}
            href="/cart#checkout"
            position="sticky"
            top="50px"
            py={2}
            background="#eee"
            zIndex="sticky"
          >
            Proceed to checkout? (show in mobile)
          </Flex>
        )}

        <Flex
          wrap="wrap"
          align="flex-start"
          position="sticky"
          top="50px"
          zIndex="sticky"
        >
          <CartTable
            setSubtotal={setSubtotal}
            setSourceCurrencyCode={setSourceCurrencyCode}
          />

          {subtotal > 0 && (
            <Stack
              as="form"
              noValidate={true}
              onSubmit={handleCheckout}
              width="full"
              minWidth="340px"
              maxWidth="350px"
              minHeight="400px"
              boxShadow="1"
              position="sticky"
              top="70px"
              zIndex="sticky"
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

              <CheckoutOrderForm
                setUserData={data => {
                  userData.current = data;
                }}
              />

              <Stack spacing={3} fontSize="" height="full">
                <Flex justify="space-between">
                  <Heading as="h3" fontSize="md">
                    Subtotal
                  </Heading>
                  <Currency
                    value={subtotal}
                    sourceCurrencyCode={sourceCurrencyCode}
                  />
                </Flex>

                <Flex justify="space-between">
                  <Heading as="h3" fontSize="md">
                    Delivery Fees
                  </Heading>
                  <Currency
                    value={deliveryCost.value}
                    sourceCurrencyCode={deliveryCost.currencyCode}
                  />
                </Flex>

                <Flex justify="space-between" mb={2}>
                  <Heading as="h3" fontSize="md">
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
        </Flex>
      </Stack>
    </AppContainer>
  );
}

export default CartPage;
