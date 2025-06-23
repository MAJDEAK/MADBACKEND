const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publisherController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, admin, publisherController.addPublisher);
router.get("/", auth, publisherController.getAllPublishers);
router.get("/:id", auth, publisherController.getPublisherById);
router.get("/:id/books", auth, publisherController.getPublisherBooks);
router.get("/search/name", auth, publisherController.searchPublishersByName);
router.delete("/", auth, admin, publisherController.deleteAllPublishers);

module.exports = router;
