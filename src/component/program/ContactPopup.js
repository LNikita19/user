import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";

const ContactPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        Name: "",
        LastName: "",
        Email: "",
        Phone: "",
        Message: "",
    });

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/userContactData`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.status) {
                setSuccess("Your message has been sent successfully!");
                setFormData({ Name: "", LastName: "", Email: "", Phone: "", Message: "" });
            } else {
                throw new Error(response.data.msg || "Submission failed");
            }
        } catch (err) {
            setError("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-[#FFF9E1] rounded-3xl shadow-lg w-full md:max-w-4xl relative flex flex-col md:flex-row">

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 bg-[#FFF9E1] text-[#361A06] border-[#FD8531] w-8 h-8 rounded-full flex items-center justify-center"
                    onClick={onClose}
                >
                    ✖
                </button>

                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-6 font-david">
                    {/* Logo */}
                    <img src="/Logo.png" alt="Logo" className="w-32 mb-4" />

                    <h2 className="text-[32px] text-[#361A06] font-extrabold">Got a question?</h2>
                    <p className="text-[32px] text-[#361A06] font-extrabold">Contact us...</p>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        {/* Fields will stack on small screens and be side-by-side on md+ */}
                        <div className="flex flex-col md:flex-row md:space-x-6">
                            <input type="text" name="Name" placeholder="First name*" value={formData.Name} onChange={handleChange} required
                                className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                            <input type="text" name="LastName" placeholder="Last name*" value={formData.LastName} onChange={handleChange} required
                                className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                        </div>
                        <div className="flex flex-col md:flex-row md:space-x-6">
                            <input type="email" name="Email" placeholder="Email address*" value={formData.Email} onChange={handleChange} required
                                className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                            <input type="text" name="Phone" placeholder="Your number*" value={formData.Phone} onChange={handleChange} required
                                className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                        </div>
                        <input type="text" name="Message" placeholder="Message*" value={formData.Message} onChange={handleChange} required
                            className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />

                        <button className="w-full bg-[#361A06] text-[#FFF9E1] p-2 rounded-lg">Submit</button>
                    </form>
                </div>

                {/* Right Side - Image (Hidden on small screens) */}
                <div className="w-full md:w-1/2 hidden md:block">
                    <img src="/contact.webp" alt="Contact" className="w-full h-full rounded-xl" />
                </div>
            </div>
        </div>

    );
};

export default ContactPopup;
