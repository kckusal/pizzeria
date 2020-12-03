import { Button, Flex, Icon } from "@chakra-ui/react";

import useCart from "redux/hooks/cart";
import { AddedInCartIcon } from "components/icons";

function AddToCart({ itemId }) {
  const { cart, addToCartInProgress, addToCart } = useCart();

  return (
    <>
      {cart[itemId] ? (
        <Flex py={2} fontWeight="500" color="gray.600" align="center">
          <Icon as={AddedInCartIcon} fontSize="lg" mr={2} />
          Added in Cart
        </Flex>
      ) : (
        <Button
          isLoading={addToCartInProgress(itemId)}
          loadingText="Adding..."
          width="full"
          maxWidth="150px"
          colorScheme="blue"
          variant="solid"
          height="full"
          _hover={{ boxShadow: "3" }}
          onClick={() => addToCart(itemId)}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
}

export default AddToCart;
