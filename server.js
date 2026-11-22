
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "MovieRate API működik!"
  });
});

app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
  });
};

startServer();
