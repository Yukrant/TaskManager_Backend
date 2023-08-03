const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 5000;

const routes = require("./routes/Routes");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.error(e));

// Routes
app.use(routes);

app.listen(PORT, () => console.log("Server running on port " + PORT));
