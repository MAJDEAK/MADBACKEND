const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, admin, bookController.addBook);
router.get("/", auth, bookController.getAllBooks);
router.get("/:id", auth, bookController.getBookById);
router.get("/search/title", auth, bookController.searchBooksByTitle);
router.delete("/", auth, admin, bookController.deleteAllBooks);

module.exports = router;
