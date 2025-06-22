const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const initializeDatabase = require("./db.init.js");

dotenv.config();
initializeDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const publisherRoutes = require("./routes/publisherRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/publishers", publisherRoutes);

app.get("/", (_, res) => {
  res.json({ message: "E-Library API Server" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
