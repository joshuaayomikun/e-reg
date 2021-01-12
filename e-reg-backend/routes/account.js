const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  firstPageSignup,
  checkEmail,
  checkUsername,
  verifyUserbyEmail,
  updatePassword,
} = require("../controllers/accountController");

router.post(
  "/sigup/1",
  [
    check("username", "Please enter your first name").not().isEmpty(),
    check("name", "Please enter your first name").not().isEmpty(),
    check("emailAddress", "Please enter a valid email address").not().isEmpty(),
    check("phoneNumber", "Please enter a PhoneNumber").not().isEmpty(),
  ],
  firstPageSignup
);

router.get("/checkEmail/:email", checkEmail);

router.get("/checkusername/:username", checkUsername);

router.put(
  "/signup/2/:username",
  [check("code", "The Code is empty").notEmpty()],
  verifyUserbyEmail
);

router.put(
  "/signup/3/:username",
  [check("code", "The Code is empty").notEmpty()],
  verifyUserbyPhone
);

router.put(
  "/signup/4/username",
  [check("password", "The password is empty").notEmpty()],
  updatePassword
);