require("dotenv").config();
const express = require("express");
const db = require("./models")
const authRoutes = require("./routes/authRoutes");


const app = express();
const port = 8081;

// parse request of content-type: application/json
app.use(express.json());


// router
app.use(authRoutes);



app.listen(port, () => {
  console.log("server listening port:", port);
});


  