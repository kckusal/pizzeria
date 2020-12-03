import { ObjectId } from "mongodb";

import { connectToDatabase } from "utils/mongodb";
import { HttpResponseError } from "utils/";
import { cors, runMiddleware } from "utils/apiMiddlewares";
// const fs = require("fs");
// const path = require("path");
// const { HttpResponseError } = require("../../utils/");

// const cartFileDir = path.join(process.cwd(), "data/cart.json");

/** cart.json has the schema:
 * {
 *    "userId": {
 *      "menuItemId1": itemQuantity,
 *      "menuItemId2": itemQuantity
 *    }
 * }
 */

export function saveUserCart(id, cart) {
  return new Promise((resolve, reject) => {
    try {
      connectToDatabase()
        .then(conn => conn.db.collection("users"))
        .then(users =>
          users.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { cart } },
            { returnNewDocument: true }
          )
        )
        .then(result => {
          if (result) {
            resolve();
          } else {
            reject(
              new HttpResponseError(500, "Some error occurred while updating")
            );
          }
        })
        .catch(e => {
          throw new Error(e);
        });
    } catch (err) {
      reject(new HttpResponseError(500, err.message));
    }
  });
}

export function getUserCart(id) {
  return new Promise((resolve, reject) => {
    try {
      connectToDatabase()
        .then(conn => conn.db.collection("users"))
        .then(users =>
          users.findOne({ _id: ObjectId(id) }, { projection: { cart: 1 } })
        )
        .then(result => {
          if (result) {
            resolve(result.cart);
          } else {
            resolve({});
          }
        })
        .catch(err => {
          throw new Error(err);
        });
    } catch (err) {
      reject(new HttpResponseError(500, err.message));
    }
  });
}

export default async (req, res) => {
  console.log(`[Cart Req]: `, req.body);

  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    // save cart.
    return saveUserCart(req.body.id, req.body.cart)
      .then(response => {
        return res.status(200).json({ message: "Cart saved successfully." });
      })
      .catch(e => {
        return res.status(e.code).json({ message: e.message });
      });
  } else if (req.method === "GET") {
    // get cart
    return getUserCart(req.body.id)
      .then(cart => {
        return res.status(200).json({ cart });
      })
      .catch(e => {
        return res.status(e.code).json({ message: e.message });
      });
  }

  return res.status(204);
};
