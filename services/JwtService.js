import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "30s" }
  );

  return access_token;
};

export const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "365d" }
  );

  return refresh_token;
};

export const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            message: "The authemtication",
          });
        }
        const access_token = await genneralAccessToken({
          id: user?.id,
        });
        resolve({
          status: "OK",
          message: "SUCESS",
          access_token,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};