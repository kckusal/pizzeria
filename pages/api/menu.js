const fs = require("fs");
const path = require("path");

const menuFileDir = path.join(process.cwd(), "data/menu.json");

export function getMenuItems() {
  const rawData = fs.readFileSync(menuFileDir);
  return JSON.parse(rawData);
}

export default (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({ menu: getMenuItems() });
  }

  res.status(204);
};
