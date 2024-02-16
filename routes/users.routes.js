import { Router } from "express";
import { check } from "express-validator";
import {
  getUsers,
  createNewUser,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updateUserById,
  loginUser,
  deactiveUserById,
  getUserRoleForProcess,
} from "../controllers/users.controllers.js";

const router = Router();

// var loginValidate = [
//   check("user_email", "Username Must Be an Email Address")
//     .isEmail()
//     .trim()
//     .escape(),
//   check("user_password")
//     .isLength({ min: 8 })
//     .withMessage("Password Must Be at Least 8 Characters")
//     .matches("[0-9]")
//     .withMessage("Password Must Contain a Number")
//     .matches("[A-Z]")
//     .withMessage("Password Must Contain an Uppercase Letter")
//     .trim()
//     .escape(),
// ];

router.get("/users", getUsers);
router.post("/register", createNewUser);
router.get("/users/:user_id", getUserById);
router.delete("/users/:user_id", deleteUserById);
router.put("/users/:user_id", deactiveUserById);
router.put("/users/:user_id", updateUserById);
router.post("/user/login", loginUser);
router.get("/user/role/:user_id/:process_id", getUserRoleForProcess);
router.post("/users/email", getUserByEmail);

export default router;
