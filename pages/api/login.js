const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const { HttpResponseError } = require("../../utils/");

const usersFileDir = path.join(process.cwd(), "data/users.json");

function login(email, password) {
  return new Promise((resolve, reject) => {
    try {
      if (!email || !password) {
        reject(new HttpResponseError(400, "Email and password are required."));
      }

      const rawData = fs.readFileSync(usersFileDir);
      const users = JSON.parse(rawData);

      const targetUser = users.find(u => u.email === email);

      if (!targetUser) {
        reject(new HttpResponseError(404, "No such user found."));
      }

      const { passwordHash, ...restUserData } = targetUser;
      const result = bcrypt.compareSync(password, passwordHash);

      if (result) {
        resolve(restUserData);
      } else {
        reject(new HttpResponseError(401, "Email/Password incorrect."));
      }
    } catch (err) {
      reject(new HttpResponseError(500, err.message));
    }
  });
}

export default (req, res) => {
  console.log(`[Login request]: `, req.body);

  if (req.method === "POST") {
    console.log("will check login now.");

    return login(req.body?.email, req.body?.password)
      .then(user => {
        console.log("User", user);
        return res.status(200).json({ user });
      })
      .catch(err => {
        console.log("ERR", err);
        return res.status(err.code).json({ message: err.message });
      });
  }
};
