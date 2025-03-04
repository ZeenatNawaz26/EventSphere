import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // To navigate after form submission

const ExpoRegistration = () => {
    // Define state to hold form data
    const [companyName, setCompanyName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [eventSelection, setEventSelection] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Example validation: check if all fields are filled
        if (!companyName || !contactPerson || !email || !phone || !eventSelection) {
            setMessage("Please fill all fields!");
            return;
        }

        // Prepare the data for submission
        const formData = {
            companyName,
            contactPerson,
            email,
            phone,
            eventSelection,
        };

        try {
            // Replace this with your API call
            const response = await fetch("your-api-endpoint/expo-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Registration successful!");
                // Navigate to another page, e.g., "Thank You" or "Dashboard"
                navigate("/thank-you");
            } else {
                setMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="expo-registration-form">
            <h2>Expo Registration</h2>
            {message && <p>{message}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Enter your company name"
                    />
                </Form.Group>

                <Form.Group controlId="contactPerson">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                        type="text"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Enter your contact person's name"
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                    />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </Form.Group>

                <Form.Group controlId="eventSelection">
                    <Form.Label>Select Event</Form.Label>
                    <Form.Control
                        as="select"
                        value={eventSelection}
                        onChange={(e) => setEventSelection(e.target.value)}
                    >
                        <option value="">Select an event</option>
                        <option value="tech-expo">Tech Expo</option>
                        <option value="business-expo">Business Expo</option>
                        <option value="science-expo">Science Expo</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Registration
                </Button>
            </Form>
        </div>
    );
};

export default ExpoRegistration;
