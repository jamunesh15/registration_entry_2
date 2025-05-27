const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "https://registration-entry-2-ui1.onrender.com", // Your frontend URL
  credentials: true,
}));  

app.use(express.json());

// Your routes    
const route = require("./routes/userroute");
app.use("/api/v1", route);

// DB connection
const dbconnect = require("./config/dbconnect");
dbconnect();

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
