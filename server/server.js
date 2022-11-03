require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const db = require("./models");
const PORT = process.env.PORT || 4000;

// routes
const userRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes")
const productsRoutes = require("./routes/productsRoutes")


const app = express();

//middleware
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:4000"]
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync().then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use("/api/employees", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
