import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  console.log(req.headers);
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Authentication",
        status: "Error"
      })
    } else {
      console.log(user);
      next();
    }

  })
  const check = NaN;
  const check1 = null;
  const check2 = undefined;
  const check3 = 0;
  const check4 = "";
  const check5 = false;
}