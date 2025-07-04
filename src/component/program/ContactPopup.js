// import React, { useState } from "react";
// import { API_BASE_URL } from "../../config";
// import axios from "axios";

// const ContactPopup = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         Name: "",
//         LastName: "",
//         Email: "",
//         Phone: "",
//         Message: "",
//     });

//     const [success, setSuccess] = useState(null);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSuccess(null);
//         setError(null);

//         try {
//             const response = await axios.post(`${API_BASE_URL}/userContactData`, formData, {
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (response.data.status) {
//                 setSuccess("Your message has been sent successfully!");
//                 setFormData({ Name: "", LastName: "", Email: "", Phone: "", Message: "" });
//             } else {
//                 throw new Error(response.data.msg || "Submission failed");
//             }
//         } catch (err) {
//             setError("Failed to send message. Please try again.");
//         }
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm bg-black/30">
//             <div className="bg-[#FFF9E1] rounded-3xl shadow-lg w-full md:max-w-4xl relative flex flex-col md:flex-row">

//                 {/* Close Button */}
//                 <button
//                     className="absolute top-4 right-4 bg-[#FFF9E1] text-[#361A06] border-[#FD8531] w-8 h-8 rounded-full flex items-center justify-center"
//                     onClick={onClose}
//                 >
//                     ✖
//                 </button>

//                 {/* Left Side - Form */}
//                 <div className="w-full md:w-1/2 p-6 font-david">
//                     {/* Logo */}
//                     <img src="/logo1.png" alt="Logo" className="w-32 mb-4" />

//                     <h2 className="text-[32px] text-[#361A06] leading-[0.6] font-extrabold">Got a question?</h2>
//                     <p className="text-[32px] text-[#361A06] leading-[1.1] font-extrabold">Contact us...</p>

//                     <form onSubmit={handleSubmit} className="mt-4  space-y-4 font-david lg:space-y-10">
//                         {/* Fields will stack on small screens and be side-by-side on md+ */}
//                         <div className="flex flex-col md:flex-row md:space-x-6">
//                             <input type="text" name="Name" placeholder="First name*" value={formData.Name} onChange={handleChange} required
//                                 className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06] " />
//                             <input type="text" name="LastName" placeholder="Last name*" value={formData.LastName} onChange={handleChange} required
//                                 className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]" />
//                         </div>
//                         <div className="flex flex-col md:flex-row md:space-x-6">
//                             <input type="email" name="Email" placeholder="Email address*" value={formData.Email} onChange={handleChange} required
//                                 className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]" />
//                             <input type="text" name="Phone" placeholder="Your number*" value={formData.Phone} onChange={handleChange} required
//                                 className="w-full md:w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]" />
//                         </div>
//                         <input type="text" name="Message" placeholder="Message*" value={formData.Message} onChange={handleChange} required
//                             className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]" />

//                         <button className="w-full bg-[#361A06] text-[#FFF9E1] p-2 mt-12 rounded-lg">Submit</button>
//                     </form>
//                 </div>

//                 {/* Right Side - Image (Hidden on small screens) */}
//                 <div className="w-full md:w-1/2 hidden md:block">
//                     <img src="/contact.webp" alt="Contact" className="w-full h-full rounded-xl" />
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default ContactPopup;



import React, { useState, useEffect } from "react";
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

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        // First Name
        if (!formData.Name.trim()) newErrors.Name = "First name is required";
        else if (!nameRegex.test(formData.Name)) newErrors.Name = "Only letters allowed in first name";

        // Last Name
        if (!formData.LastName.trim()) newErrors.LastName = "Last name is required";
        else if (!nameRegex.test(formData.LastName)) newErrors.LastName = "Only letters allowed in last name";

        // Email
        if (!formData.Email.trim()) newErrors.Email = "Email is required";
        else if (!emailRegex.test(formData.Email)) newErrors.Email = "Invalid email format";

        // Phone
        if (!formData.Phone.trim()) newErrors.Phone = "Phone number is required";
        else if (!phoneRegex.test(formData.Phone)) newErrors.Phone = "Phone must be exactly 10 digits";

        // Message
        if (!formData.Message.trim()) newErrors.Message = "Message is required";
        else if (formData.Message.trim().length < 10) newErrors.Message = "Message must be at least 10 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);

        if (!validateForm()) return;

        try {
            const response = await axios.post(`${API_BASE_URL}/userContactData`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.status) {
                setSuccess("Your message has been sent successfully!");
                setFormData({ Name: "", LastName: "", Email: "", Phone: "", Message: "" });
                setErrors({});
            } else {
                throw new Error(response.data.msg || "Submission failed");
            }
        } catch (err) {
            setError("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm bg-black/30 z-50">
            <div className="bg-[#FFF9E1] rounded-3xl shadow-lg w-full md:max-w-4xl relative flex flex-col md:flex-row">

                <button
                    className="absolute top-4 right-4 bg-[#FFF9E1] text-[#361A06] border-[#FD8531] w-8 h-8 rounded-full flex items-center justify-center"
                    onClick={onClose}
                >
                    ✖
                </button>

                <div className="w-full md:w-1/2 p-6 font-david">
                    <img src="/logo1.png" alt="Logo" className="w-32 mb-4" />
                    <h2 className="text-[32px] text-[#361A06] leading-[0.6] font-extrabold">Got a question?</h2>
                    <p className="text-[32px] text-[#361A06] leading-[1.1] font-extrabold">Contact us...</p>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4 font-david lg:space-y-10">
                        <div className="flex flex-col md:flex-row md:space-x-6">
                            <div className="w-full md:w-1/2">
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="First name*"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]"
                                />
                                {errors.Name && <p className="text-red-600 text-sm mt-1">{errors.Name}</p>}
                            </div>
                            <div className="w-full md:w-1/2">
                                <input
                                    type="text"
                                    name="LastName"
                                    placeholder="Last name*"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                    className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]"
                                />
                                {errors.LastName && <p className="text-red-600 text-sm mt-1">{errors.LastName}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-6">
                            <div className="w-full md:w-1/2">
                                <input
                                    type="email"
                                    name="Email"
                                    placeholder="Email address*"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]"
                                />
                                {errors.Email && <p className="text-red-600 text-sm mt-1">{errors.Email}</p>}
                            </div>
                            <div className="w-full md:w-1/2">
                                <input
                                    type="text"
                                    name="Phone"
                                    placeholder="Your number*"
                                    value={formData.Phone}
                                    onChange={handleChange}
                                    className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]"
                                />
                                {errors.Phone && <p className="text-red-600 text-sm mt-1">{errors.Phone}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                type="text"
                                name="Message"
                                placeholder="Message*"
                                value={formData.Message}
                                onChange={handleChange}
                                className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] font-medium bg-transparent outline-none placeholder-[#361A06]"
                            />
                            {errors.Message && <p className="text-red-600 text-sm mt-1">{errors.Message}</p>}
                        </div>

                        {success && <p className="text-green-600 text-sm">{success}</p>}
                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <button className="w-full bg-[#361A06] text-[#FFF9E1] p-2 mt-12 rounded-lg">Submit</button>
                    </form>
                </div>

                <div className="w-full md:w-1/2 hidden md:block">
                    <img src="/contact.webp" alt="Contact" className="w-full h-full rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default ContactPopup;

