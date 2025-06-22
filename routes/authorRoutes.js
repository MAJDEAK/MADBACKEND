const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, admin, authorController.addAuthor);
router.get("/", auth, authorController.getAllAuthors);
router.get("/:id", auth, authorController.getAuthorById);
router.get("/:id/books", auth, authorController.getAuthorBooks);
router.get("/search/name", auth, authorController.searchAuthorsByName);
router.delete("/", auth, admin, authorController.deleteAllAuthors);

module.exports = router;
