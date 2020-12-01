const fs = require("fs");

export function getMenuItems() {
  const rawData = fs.readFileSync("data/menu.json");
  return JSON.parse(rawData);
}

export default (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({ menu: getMenuItems() });
  }

  res.status(204);
};
