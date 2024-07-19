import { Customer } from "../models/CustomerModel.js";
import bcrypt from "bcrypt";
import { genneralAccessToken, genneralRefreshToken } from "./JwtService.js";

export const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { fullname, username, email, password, phone } = newUser;
    try {
      const checkemailUser = await Customer.findOne({
        email: email,
      });
      const checkusernamelUser = await Customer.findOne({
        username: username,
      });
      if (checkusernamelUser !== null) {
        resolve({
          status: "ERR",
          message: "The username is already",
        });
      } else if (checkemailUser !== null) {
        resolve({
          status: "ERR",
          message: "The email is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await Customer.create({
        fullname,
        username,
        email,
        password: hash,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const checkCustomer = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { username, password } = userLogin;
    try {
      const checkCustomer = await Customer.findOne({
        username: username,
      });
      if (checkCustomer === null) {
        reject({
          status: "ERR",
          message: "The username is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkCustomer.password);
      if (!comparePassword) {
        reject({
          status: "ERR",
          message: "The password is incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkCustomer._id.toString(),
      });

      const refresh_token = await genneralRefreshToken({
        id: checkCustomer._id.toString(),
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Customer.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedUser = await Customer.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Customer.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//****  admin */

// const deleteUser = (id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const checkUser = await Customer.findOne({
//         _id: id,
//       });
//       if (checkUser === null) {
//         resolve({
//           status: "ERR",
//           message: "The user is not defined",
//         });
//       }

//       await Customer.findByIdAndDelete(id);
//       resolve({
//         status: "OK",
//         message: "Delete user success",
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// const deleteManyUser = (ids) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await Customer.deleteMany({ _id: ids });
//       resolve({
//         status: "OK",
//         message: "Delete user success",
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// const getAllUser = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const allUser = await Customer.find().sort({ createdAt: -1, updatedAt: -1 });
//       resolve({
//         status: "OK",
//         message: "Success",
//         data: allUser,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
