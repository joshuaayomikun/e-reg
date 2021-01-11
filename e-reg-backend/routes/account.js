const express = require("express");
const {check} = require("express-validator");
const router = express.Router();
const {firstPageSignup, checkEmail, checkUsername } = require("../controllers/accountController");

router.post("/sigup/1", [
    check("Username", "Please enter your first name").not().isEmpty(),
    check("Name", "Please enter your first name").not().isEmpty(),
    check("Email", "Please enter a valid email address").not().isEmpty(),
    check("PhoneNumber", "Please enter a PhoneNumber").not().isEmpty()
], firstPageSignup);

router.get("/checkEmail/:email", checkEmail)

router.get("/checkusername/:username", checkUsername)

router.put("/signup/2/:username", [
    check("emailDigit",  "The Code is empty").notEmpty()
])





