import bcrypt from "bcrypt";

import { connectToDatabase } from "utils/mongodb";
import { HttpResponseError } from "utils/";
import { cors, runMiddleware } from "utils/apiMiddlewares";

// const fs = require("fs");
// const path = require("path");
// const bcrypt = require("bcrypt");
// const { HttpResponseError } = require("../../utils/");

const saltRounds = 10;

// const usersFileDir = path.join(process.cwd(), "data/users.json");

async function getUser(email) {
  return connectToDatabase()
    .then(response => response.db)
    .then(db => db.collection("users").findOne({ email }));
}

function register({ email, password, firstName, lastName, address }) {
  return new Promise((resolve, reject) => {
    try {
      if (!email || !password) {
        reject(
          new HttpResponseError(
            400,
            "Email & password are required at the least to register."
          )
        );
      }

      getUser(email).then(targetUser => {
        if (targetUser) {
          reject(
            new HttpResponseError(
              403,
              "An user with given email is already registered."
            )
          );
        } else {
          const hash = bcrypt.hashSync(password, saltRounds);

          if (hash) {
            // add user

            connectToDatabase()
              .then(response => response.db.collection("users"))
              .then(users =>
                users.insertOne({
                  firstName,
                  lastName,
                  email,
                  passwordHash: hash,
                  address
                })
              )
              .then(result => {
                // console.log("Insert result", result);
                resolve({ id: result.insertedId.toString() });
              })
              .catch(e => {
                throw new Error(e);
              });
          } else {
            reject(
              new HttpResponseError(
                500,
                "Some internal error occurred registering user."
              )
            );
          }
        }
      });
    } catch (err) {
      reject(new HttpResponseError(500, err.message));
    }
  });
}

export default async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);

  console.log(`[Register request]: `, req.body);

  if (req.method === "POST") {
    console.log("will attempt register now.");

    return register(req.body)
      .then(response => {
        return res
          .status(200)
          .json({ _id: response.id, message: "User successfully registered." });
      })
      .catch(err => {
        return res.status(err.code).json({ message: err.message });
      });
  }
};
