import { useSelector, useDispatch } from "react-redux";

import {
  Stack,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Icon
} from "@chakra-ui/react";
import { FiZoomIn } from "react-icons/fi";

import Currency from "components/currency";
import { AddedInCartIcon } from "components/icons";
import { addMultipleInCart } from "redux/actions";

function MenuItem({ data, horizontal = false, ...restProps }) {
  const dispatch = useDispatch();

  const { id, title, type, image, price } = data;

  const placeholderImageUrl = useSelector(
    state => state.constants.placeholderImageUrl
  );

  const addedInCart = useSelector(state => {
    const quantity = state.cart.quantityByItemId[id];
    return typeof quantity !== "undefined";
  });

  const addMeToCart = () => {
    dispatch(addMultipleInCart([id]));
  };

  return (
    <Stack
      direction={horizontal ? "row" : "column"}
      width={horizontal ? "full" : "234px"}
      height={horizontal ? "130px" : "340px"}
      boxShadow="1"
      bg="white"
      role="group"
      transition="box-shadow 0.3s linear, cursor 0.3s linear"
      _hover={{ boxShadow: 5, cursor: "pointer" }}
      {...restProps}
      zIndex="0"
    >
      <Flex
        overflow="hidden"
        position="relative"
        width="full"
        height={horizontal ? "full" : "156px"}
        minWidth="155px"
        justify="center"
        align="center"
      >
        {price.discountPercent && (
          <Flex
            position="absolute"
            top="0px"
            left="0px"
            bg="gray.800"
            color="gray.200"
            width="full"
            maxWidth="75px"
            height="45px"
            justify="center"
            align="center"
            fontSize="xl"
            zIndex="2"
          >
            <strong>−</strong>
            <Flex ml="1px" mr="2px">
              {price.discountPercent}
            </Flex>
            %
          </Flex>
        )}

        <Flex
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="gray.700"
          color="gray.50"
          zIndex="2"
          px={2}
          py={1}
          fontSize="sm"
          opacity="0"
          align="center"
          _groupHover={{ opacity: 1 }}
        >
          <Icon as={FiZoomIn} mr={1} /> Click to view item details.
        </Flex>

        <Image
          src={image}
          width="full"
          height={horizontal ? "full" : "auto"}
          objectFit={horizontal ? "contain" : "scale-down"}
          bg="gray.100"
          fallbackSrc={placeholderImageUrl}
          transition="filter 0.3s linear, transform 0.3s linear"
          zIndex={1}
          _groupHover={{ filter: "brightness(0.8)", transform: "scale(1.2)" }}
        />
      </Flex>

      <Stack width="full" px={3} py={horizontal ? 3 : 0} spacing={0}>
        <Heading as="h3" fontSize="lg">
          {title}
        </Heading>
        <Text my={0} color="gray.500">
          {type}
        </Text>

        <Stack
          direction={horizontal ? "row" : "column"}
          height="full"
          justify="center"
          align="center"
          pt={2}
          px={2}
          py={horizontal ? 4 : 1}
          spacing={horizontal ? 2 : 4}
        >
          <Currency
            value={price.value}
            sourceCurrencyCode={price.currencyCode}
            justify="center"
            fontSize="1.7rem"
            fontWeight="500"
            width="full"
            my={1}
          />

          <Flex width="full" height="40px" justify="center">
            {addedInCart ? (
              <Flex py={2} fontWeight="500" color="gray.600" align="center">
                <Icon as={AddedInCartIcon} fontSize="lg" mr={2} />
                Added in Cart
              </Flex>
            ) : (
              <Button
                width="full"
                maxWidth="150px"
                colorScheme="blue"
                variant="solid"
                height="full"
                _hover={{ boxShadow: "3" }}
                onClick={addMeToCart}
              >
                Add to Cart
              </Button>
            )}
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MenuItem;
