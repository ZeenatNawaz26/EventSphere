const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact')
const nodemailer = require('nodemailer');

// Handle form submission
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save to database
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // Send email notification (Optional)
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // });


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false  // 🔥 Ignore SSL certificate issues
            }
        });
        

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'aptechnn769@gmail.com', // Change to your email
            subject: `New Contact Form Submission - ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
