import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  saveCartSucceeded,
  saveCartFailed,
  checkoutSucceeded,
  checkoutFailed
} from "redux/actions";
import { postData } from "utils/";

let addingInCart = {};

export default function useCart() {
  const dispatch = useDispatch();

  const authenticated = useSelector(state => state.user.authenticated);

  const cart = useSelector(state =>
    state.user.authenticated === null
      ? state.user.guest.cart || {}
      : state.user.authenticated.cart || {}
  );
  const cartAddTimerId = useRef(null);
  const itemIds = Object.keys(cart);

  const addToCartInProgress = useCallback(itemId => {
    if (addingInCart[itemId]) return true;
    return false;
  });

  const saveCartInDb = useCallback((userId, cart) => {
    return postData(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      id: userId,
      cart
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(
            saveCartSucceeded(cart, {
              status: "success",
              title: "Cart updated!"
            })
          );
        } else {
          throw new Error(
            response.data.message ||
              "Could not get a successful response from server."
          );
        }
      })
      .catch(e => {
        dispatch(
          saveCartFailed({
            status: "error",
            title: "Cart save Failed.",
            description: e.message
          })
        );
      });
  });

  const addToCart = useCallback(itemId => {
    const newCart = { ...cart, [itemId]: 1 };

    if (authenticated !== null) {
      if (addingInCart[itemId]) {
        return;
      } else {
        addingInCart[itemId] = cartAddTimerId.current = setTimeout(() => {
          const { itemId, ...restInProgress } = addingInCart;

          clearTimeout(addingInCart[itemId]);

          addingInCart = restInProgress;
        }, 30000);
      }

      saveCartInDb(authenticated._id, newCart).finally(() => {
        const { itemId, ...restInProgress } = addingInCart;

        addingInCart = restInProgress;
      });
    } else {
      dispatch(
        saveCartSucceeded(newCart, {
          status: "success",
          title: "Cart updated!",
          description: `You have added new items to cart`
        })
      );
    }
  });

  const removeFromCart = useCallback(itemId => {
    const { [itemId]: existingItem, ...newCart } = cart;

    if (authenticated !== null) {
      saveCartInDb(authenticated._id, newCart);
    } else {
      dispatch(
        saveCartSucceeded(newCart, {
          status: "success",
          title: "Cart updated!",
          description: `You have removed some items from cart.`
        })
      );
    }
  });

  const clearCart = useCallback((showToast = true) => {
    if (authenticated !== null) {
      saveCartInDb(authenticated._id, {});
    } else {
      dispatch(
        saveCartSucceeded(
          {},
          showToast
            ? {
                status: "success",
                title: "Cart cleared!",
                description: `All items removed from cart.`
              }
            : null
        )
      );
    }
  });

  const getQuantity = useCallback(itemId => {
    return cart[itemId] || 0;
  });

  const setQuantity = useCallback((itemId, quantity) => {
    const newCart = { ...cart, [itemId]: quantity };

    if (authenticated !== null) {
      saveCartInDb(authenticated._id, newCart);
    } else {
      dispatch(
        saveCartSucceeded(newCart, {
          status: "success",
          title: "Cart updated!",
          description: `You have updated item quantity in cart.`
        })
      );
    }
  });

  const checkout = useCallback((currencyCode, deliveryCost, sumTotal) => {
    if (authenticated !== null) {
      postData(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        userId: authenticated._id,
        cart,
        currencyCode,
        deliveryCost,
        sumTotal
      })
        .then(response => {
          if (response.status === 200) {
            dispatch(
              checkoutSucceeded(
                {
                  createdAt: response.data.createdAt,
                  items: cart,
                  currencyCode,
                  deliveryCost,
                  sumTotal
                },
                {
                  status: "success",
                  title: "Checkout successful!",
                  description: "You may check orders page now."
                }
              )
            );
          } else {
            throw new Error(
              response.data?.message || "Some error occurred. Try later!"
            );
          }
        })
        .catch(error => {
          dispatch(
            checkoutFailed({
              status: "error",
              title: "Checkout failed",
              description: error?.message
            })
          );
        });
    } else {
      dispatch(
        checkoutSucceeded(
          {},
          {
            status: "success",
            title: "Checkout successful!",
            description: "Your order has been placed."
          }
        )
      );
    }
  });

  return {
    cart,
    itemIds,
    count: itemIds.length,
    authenticated,
    addToCartInProgress,
    addToCart,
    removeFromCart,
    clearCart,
    setQuantity,
    getQuantity,
    checkout
  };
}
