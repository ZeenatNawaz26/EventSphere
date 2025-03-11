// import React, { useState } from 'react';

// const Contact = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         subject: '',
//         message: ''
//     });

//     const [loading, setLoading] = useState(false);
//     const [responseMessage, setResponseMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setResponseMessage('');

//         try {
//             const response = await fetch('http://localhost:8000/api/contact', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 setResponseMessage("✅ Message sent successfully!");
//                 setFormData({ name: '', email: '', subject: '', message: '' });
//             } else {
//                 setResponseMessage(`❌ Error: ${result.message}`);
//             }
//         } catch (error) {
//             setResponseMessage("❌ Server error. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section id="contact" className="section-bg wow fadeInUp">
//             <div className="container">
//                 <div className="section-header">
//                     <h2>Contact Us</h2>
//                     <p>Send us a message and we will get back to you soon.</p>
//                 </div>

//                 <div className="form">
//                     {responseMessage && <div id="sendmessage">{responseMessage}</div>}
//                     <form onSubmit={handleSubmit} className="contactForm">
//                         <div className="form-row">
//                             <div className="form-group col-md-6">
//                                 <input 
//                                     type="text" name="name" className="form-control" 
//                                     placeholder="Your Name" required 
//                                     value={formData.name} onChange={handleChange} 
//                                 />
//                             </div>
//                             <div className="form-group col-md-6">
//                                 <input 
//                                     type="email" name="email" className="form-control" 
//                                     placeholder="Your Email" required 
//                                     value={formData.email} onChange={handleChange} 
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <input 
//                                 type="text" name="subject" className="form-control" 
//                                 placeholder="Subject" required 
//                                 value={formData.subject} onChange={handleChange} 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <textarea 
//                                 name="message" className="form-control" rows="5" 
//                                 placeholder="Message" required 
//                                 value={formData.message} onChange={handleChange} 
//                             ></textarea>
//                         </div>
//                         <div className="text-center">
//                             <button type="submit" disabled={loading}>
//                                 {loading ? "Sending..." : "Send Message"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Contact;
import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');

        try {
            const response = await fetch('http://localhost:8000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                setResponseMessage("✅ Message sent successfully!");
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setResponseMessage(`❌ Error: ${result.message}`);
            }
        } catch (error) {
            setResponseMessage("❌ Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section 
            id="contact" 
            style={{
                background: "#f8f9fa",  // Same as sponsors background
                padding: "50px 0",
                textAlign: "center"
            }}
        >
            <div className="container">
                <div className="section-header">
                    <h2 style={{ color: "#333", fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
                        Contact Us
                    </h2>
                    <p style={{ color: "#555", fontSize: "16px" }}>
                        Send us a message and we will get back to you soon.
                    </p>
                </div>

                <div className="form" style={{ maxWidth: "600px", margin: "auto" }}>
                    {responseMessage && <div id="sendmessage" style={{ textAlign: "center", fontSize: "18px", marginBottom: "15px", padding: "10px", borderRadius: "5px" }}>{responseMessage}</div>}
                    
                    <form onSubmit={handleSubmit} className="contactForm">
                        <div className="form-row" style={{ display: "flex", gap: "10px" }}>
                            <div className="form-group col-md-6" style={{ flex: 1 }}>
                                <input 
                                    type="text" name="name" className="form-control" 
                                    placeholder="Your Name" required 
                                    value={formData.name} onChange={handleChange} 
                                    style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
                                />
                            </div>
                            <div className="form-group col-md-6" style={{ flex: 1 }}>
                                <input 
                                    type="email" name="email" className="form-control" 
                                    placeholder="Your Email" required 
                                    value={formData.email} onChange={handleChange} 
                                    style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" name="subject" className="form-control" 
                                placeholder="Subject" required 
                                value={formData.subject} onChange={handleChange} 
                                style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
                            />
                        </div>
                        <div className="form-group">
                            <textarea 
                                name="message" className="form-control" rows="5" 
                                placeholder="Message" required 
                                value={formData.message} onChange={handleChange} 
                                style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button 
                                type="submit" disabled={loading}
                                style={{
                                    background: "#d9232d", // Red Button
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    borderRadius: "5px"
                                }}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
