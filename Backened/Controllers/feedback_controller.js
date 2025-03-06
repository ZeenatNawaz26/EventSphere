const Feedback = require("../Models/feedback_model");

// 🟢 Submit Feedback (Attendees/Exhibitors)
exports.submitFeedback = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const feedback = new Feedback({
            userId: req.user.id, 
            message
        });

        await feedback.save();
        res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// 🟢 Get All Feedback (Admin)
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("userId", "name email");
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// 🟢 Respond to Feedback (Admin)
exports.respondToFeedback = async (req, res) => {
    try {
        const { response } = req.body;
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { adminResponse: response, status: "resolved" },
            { new: true }
        );

        if (!feedback) return res.status(404).json({ error: "Feedback not found" });

        res.json({ message: "Response added successfully!", feedback });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
