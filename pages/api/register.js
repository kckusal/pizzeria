const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { HttpResponseError } = require("../../utils/");

const saltRounds = 10;

const usersFileDir = path.join(process.cwd(), "data/users.json");

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

      const rawData = fs.readFileSync(usersFileDir);
      const users = JSON.parse(rawData);

      const targetUser = users.find(u => u.email === email);

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
          users.push({
            firstName,
            lastName,
            email,
            address,
            passwordHash: hash
          });

          fs.writeFileSync(usersFileDir, JSON.stringify(users));
          resolve();
        } else {
          reject(
            new HttpResponseError(
              500,
              "Some internal error occurred registering user."
            )
          );
        }
      }
    } catch (err) {
      reject(new HttpResponseError(500, err.message));
    }
  });
}

export default (req, res) => {
  console.log(`[Register request]: `, req.body);

  if (req.method === "POST") {
    console.log("will attempt register now.");

    return register(req.body)
      .then(response => {
        return res
          .status(200)
          .json({ message: "User successfully registered." });
      })
      .catch(err => {
        return res.status(err.code).json({ message: err.message });
      });
  }
};
