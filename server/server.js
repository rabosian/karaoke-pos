require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const userRoutes = require("./routes/userRoutes");
const PORT = process.env.PORT || 4000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use("/api/employees", userRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
