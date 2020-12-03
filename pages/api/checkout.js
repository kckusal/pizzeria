import { ObjectId } from "mongodb";

import { connectToDatabase } from "utils/mongodb";
import { HttpResponseError } from "utils/";
import { cors, runMiddleware } from "utils/apiMiddlewares";

// const fs = require("fs");
// const path = require("path");
// const bcrypt = require("bcrypt");

// const usersFileDir = path.join(process.cwd(), "data/users.json");

function checkout({ userId, cart, currencyCode, deliveryCost, sumTotal }) {
  return new Promise((resolve, reject) => {
    try {
      if (!userId) {
        reject(new HttpResponseError(400, "User not specified."));
      }

      // const rawData = fs.readFileSync(usersFileDir);

      const _id = new ObjectId(userId);
      const createdAt = new Date().toISOString();

      connectToDatabase()
        .then(conn => conn.db.collection("users"))
        .then(users =>
          users.findOneAndUpdate(
            { _id },
            {
              $push: {
                orders: {
                  createdAt,
                  items: cart,
                  currencyCode,
                  deliveryCost,
                  sumTotal
                }
              },
              $set: { cart: {} }
            }
          )
        )
        .then(result => {
          console.log("Updated order: ", result);

          if (result) {
            resolve(createdAt);
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

export default async (req, res) => {
  console.log(`[Checkout request]: `, req.body);

  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    console.log("will checkout cart now.");

    return checkout(req.body)
      .then(createdAt => {
        console.log("Checkout done: ", createdAt);
        return res
          .status(200)
          .json({ createdAt, message: "Checkout successful!" });
      })
      .catch(err => {
        console.log("ERR", err);
        return res.status(err.code).json({ message: err.message });
      });
  }
};
