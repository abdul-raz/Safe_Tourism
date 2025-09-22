const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./models/index");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const keyRoutes = require("./routes/keyroutes"); // Add the key generation routes

const app = express();
const port = 4000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use("/auth", authRoutes);
app.use("/", transactionRoutes);
app.use("/api/key", keyRoutes); // Use key generation API route

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server listening at http://0.0.0.0:${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
