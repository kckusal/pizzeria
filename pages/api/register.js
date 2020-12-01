const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const usersFileDir = path.join(process.cwd(), "data/users.json");

function addUser(user) {
  let error;

  if (!user || !user.email || !user.password) {
    error = "Invalid data provided. Provide at least an email and a password.";
  } else {
    const rawData = fs.readFileSync(usersFileDir);
    const users = JSON.parse(rawData);

    const { password, firstName, lastName, email, address } = user;

    if (users.find(existingUser => existingUser.email === user.email)) {
      error = "User with provided email already exists!";
    } else {
      const hash = bcrypt.hashSync(password, saltRounds);

      if (hash) {
        error = null;

        // add user
        users.push({ firstName, lastName, email, address, passwordHash: hash });
        fs.writeFileSync(usersFileDir, JSON.stringify(users));
      } else {
        error = "Some error occurred while hashing password.";
      }
    }
  }

  return { error };
}

export default (req, res) => {
  console.log(`[Register request]: ${JSON.stringify(req.body)}`);

  if (req.method === "POST") {
    const { error } = addUser(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    } else {
      return res
        .status(200)
        .json({ message: "User has registered successfully." });
    }
  }

  res.status(204);
};
