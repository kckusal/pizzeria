import Cors from "cors";

const corsWhitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://pizzeria.kckusal.vercel.app",
  "http://pizzeria.kckusal.vercel.app",
  "https://pizzeria.vercel.app"
];

// Initializing the cors middleware
export const cors = Cors({
  methods: ["GET", "POST"],
  origin: function (origin, callback) {
    // add a !origin to not block REST tools or server-to-server requests
    if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
