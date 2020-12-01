import { useSelector, useDispatch } from "react-redux";

import { Button, Flex, Icon } from "@chakra-ui/react";

import { AddedInCartIcon } from "components/icons";
import { addMultipleInCart } from "redux/actions";

function AddToCart({ itemId }) {
  const dispatch = useDispatch();

  const addedInCart = useSelector(state => {
    const quantity = state.cart.quantityByItemId[itemId];
    return typeof quantity !== "undefined";
  });

  const addMeToCart = () => {
    dispatch(addMultipleInCart([itemId]));
  };
  return (
    <>
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
    </>
  );
}

export default AddToCart;
