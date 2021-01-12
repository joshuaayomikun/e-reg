const express = require("express");
const { check } = require("express-validator");
const { getProfileByUserId } = require("../controllers/profileController");
const router = express.Router();

router.get("getprofilebyuserid/:userId", getProfileByUserId)

