const express = require("express");
const { submitFeedback, getAllFeedback, respondToFeedback } = require("../Controllers/feedback_controller");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, submitFeedback); // Users submit feedback
router.get("/", verifyAdmin, getAllFeedback); // Admin gets all feedback
router.put("/:id/respond", verifyAdmin, respondToFeedback); // Admin responds to feedback

module.exports = router;
