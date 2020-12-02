const fs = require("fs");
const path = require("path");
const { HttpResponseError } = require("../../utils/");

const cartFileDir = path.join(process.cwd(), "data/cart.json");

/** cart.json has the schema:
 * {
 *    "userId": {
 *      "menuItemId1": itemQuantity,
 *      "menuItemId2": itemQuantity
 *    }
 * }
 */

export function saveUserCart(email, cart) {
  return new Promise((resolve, reject) => {
    try {
      const rawData = fs.readFileSync(cartFileDir);

      const cartFileData = JSON.parse(rawData);
      cartFileData[email] = cart;

      fs.writeFileSync(cartFileDir, JSON.stringify(cartFileData));

      resolve();
    } catch (err) {
      reject(new HttpResponseError(500, err.message));
    }
  });
}

export function getUserCart(email) {
  return new Promise((resolve, reject) => {
    try {
      const rawData = fs.readFileSync(cartFileDir);

      const cart = JSON.parse(rawData);
      const userCart = cart[email];

      if (userCart) {
        resolve(userCart);
      } else {
        resolve([]);
      }
    } catch (err) {
      reject(new HttpResponseError(500, err.message));
    }
  });
}

export default (req, res) => {
  if (req.method === "POST") {
    // save cart.
    return saveUserCart(req.email, req.cart)
      .then(response => {
        return res.status(200).json({ message: "Cart saved successfully." });
      })
      .catch(e => {
        return res.status(e.code).json({ message: e.message });
      });
  } else if (req.method === "GET") {
    // get cart
    return getUserCart(req.email)
      .then(cart => {
        return res.status(200).json({ cart });
      })
      .catch(e => {
        return res.status(e.code).json({ message: e.message });
      });
  }

  return res.status(204);
};
