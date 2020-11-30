const fs = require("fs");
const bcrypt = require("bcrypt");

function login({ email, password }) {
  let error, user;

  if (!email || !password) {
    error = "Invalid email or password provided.";
  } else {
    const rawData = fs.readFileSync("data/users.json");
    const users = JSON.parse(rawData);

    const targetUser = users.find(u => u.email === email);

    if (!targetUser) {
      error = "No such user found.";
    } else {
      const { passwordHash, ...restUserData } = targetUser;

      // Load hash from your password DB.
      const result = bcrypt.compareSync(password, passwordHash);

      if (result) {
        error = null;
        user = restUserData;
      } else {
        error = "Email/Password incorrect.";
        user = null;
      }
    }
  }

  return { error, user };
}

export default (req, res) => {
  console.log(`[Login request]: ${JSON.stringify(req.body)}`);

  if (req.method === "POST") {
    const { error, user } = login(req.body);

    console.log(`[Login Result]: ${error} || ${user}`);

    if (error) {
      return res.status(401).json({ message: error });
    } else {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res
          .status(500)
          .json({ message: "Some error occurred while authenticating." });
      }
    }
  }

  res.status(204);
};
