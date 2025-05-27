const express = require("express");
const router = express.Router();

// Import controllers
const { createUser } = require("../controllers/Createuser");
const { getUser } = require("../controllers/Getuser");
 
// Routes
router.post("/createuser", createUser);  
router.get("/users", getUser);      
module.exports = router; 