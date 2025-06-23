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

// Test database connection and all tables
app.get("/test-db", async (req, res) => {
  try {
    const db = require("./models/db");

    // Test all tables
    const [users] = await db.execute("SELECT COUNT(*) as count FROM `Users`");
    const [authors] = await db.execute(
      "SELECT COUNT(*) as count FROM `Author`"
    );
    const [publishers] = await db.execute(
      "SELECT COUNT(*) as count FROM `Publisher`"
    );
    const [books] = await db.execute("SELECT COUNT(*) as count FROM `Book`");

    // Test admin user
    const [adminUser] = await db.execute(
      "SELECT Username, FName, LName, IsAdmin FROM `Users` WHERE Username = 'admin'"
    );

    res.json({
      message: "Database connection successful",
      tables: {
        users: users[0].count,
        authors: authors[0].count,
        publishers: publishers[0].count,
        books: books[0].count,
      },
      adminUser: adminUser[0] || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
