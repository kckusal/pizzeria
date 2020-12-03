import { connectToDatabase } from "utils/mongodb";
import { cors, runMiddleware } from "utils/apiMiddlewares";

export function getMenuItems() {
  return connectToDatabase()
    .then(response => response.db)
    .then(db =>
      db
        .collection("menu")
        .find({})
        .map(item => ({ ...item, _id: item._id.toString() }))
        .toArray()
    );
}

export default async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    return getMenuItems()
      .then(menu => res.status(200).json({ menu }))
      .catch(e => res.status(500).json(e));
  }

  res.status(204);
};
