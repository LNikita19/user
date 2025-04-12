import React, { useState } from "react";
import ContactPopup1 from "./Contactpopup1";

const PopupProgram = ({ onClose, program }) => {
    const defaultData = {
        image: "/program-image.jpg",
        quote: "Angamardana is a powerful system to bring the human mechanism to ultimate health and well-being.",
        speaker: "Sadhguru",
        title: "Default Program",
        description: "Lorem Ipsum is simply dummy text.",
        date: "04th Jan - 09th Jan 2025",
        timing: "06:00 - 09:00 AM",
        language: "English",
        fee: "₹ 8500 INR",
    };

    const displayData = program || defaultData;
    const [openFAQ, setOpenFAQ] = useState(null);
    const [showContact, setShowContact] = useState(false);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
            <div className="border-2 border-[#361A0680] lg:p-6 p-4 rounded-xl">

                <div className="py-4 px-6 lg:mt-2 mt-[2rem] rounded-lg w-full sm:max-w-lg md:max-w-xl max-h-screen overflow-y-auto bg-white shadow-xl relative">
                    {/* Close Button */}
                    <button className="absolute top-4 z-50 right-1 text-[#361A06] bg-white/100 rounded-full w-8 h-8 flex items-center justify-center " onClick={onClose}>
                        ✖
                    </button>

                    {/* Program Details */}
                    <div className="relative w-full max-h-60 overflow-hidden rounded-lg">
                        <img src={program.Photo} alt="Program" className="w-full h-full object-cover" />
                        {/* Blur Gradient Overlay */}
                        <div className="absolute -bottom-0 left-0 w-full h-1/2"
                            style={{ background: "linear-gradient(0deg, #FFFFFF 9.9%, rgba(255, 255, 255, 0.02) 20.71%)" }}>
                        </div>
                    </div>
                    {/* Quote */}
                    <p className="italic text-center text-[#361A06] mt-3">
                        {program.Quto || "Angamardana is a powerful system to bring the human mechanism to ultimate health and well-being."}
                        <br />
                        — <b className="text-[#361A06] font-david italic">Sadhguru</b>
                    </p>

                    {/* Program Details */}
                    <div className=" text-left">
                        <h3 className="text-orange-500 font-bold uppercase text-sm">About</h3>
                        <h2 className="text-xl font-bold text-[#361A06]">{program.selectProgram || "Program"}</h2>
                        <p className="text-[#361A06] mt-2">{program.Description || "Lorem Ipsum is simply dummy text."}</p>
                        <ul className="mt-4 space-y-2 text-[#361A06] font-jakarta text-[14px]">
                            {[
                                { label: "Date", value: `${formatDate(program.startDate)} - ${formatDate(program.endDate)}` },
                                { label: "Session Timings", value: program.programTiming || "06:00 - 09:00 AM" },
                                { label: "Language", value: program.selectLanguage || "English" },
                                { label: "Program Fee", value: program.programFees || "₹ 8500 INR" },
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="grid grid-cols-[auto_10px_1fr] sm:grid-cols-[1fr_10px_2fr] items-start text-start"
                                >
                                    <span className="font-bold text-[#361A06] whitespace-nowrap">
                                        • {item.label}
                                    </span>
                                    <span className="text-start font-bold text-[#361A06]">:</span>
                                    <span className="text-[#361A06] text-start">{item.value}</span>
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* FAQ Section */}
                    <div className="mt-4">
                        <h3 className="mt-2 mb-4  whitespace-nowrap text-lg font-david text-[16px] md:text-[24px] text-[#361A06] font-bold">
                            FAQs (Important Please Read)
                        </h3>
                        {program.faq && program.faq.map((faq, index) => (
                            <div key={index} className="mb-2 border-2 border-[#361A0680] rounded-lg">
                                <button
                                    className="w-full text-left px-4 py-2 bg-white flex justify-between items-center"
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                >
                                    {faq.question}
                                    <span className="text-xs text-[#361A06B2]">{openFAQ === index ? "▲" : "▼"}</span>
                                </button>
                                {openFAQ === index && (
                                    <p className="px-4 py-2 bg-white border-t">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className=" flex flex-col lg:flex-row justify-between font-jakarta lg:space-x-2  space-y-2 lg:space-y-0 mt-2">
                        {/* Contact Us Button */}
                        <button className="px-4 py-2 w-full lg:w-1/2 border border-orange-500 font-bold text-orange-500 bg-[#FFF9E1] rounded-xl" onClick={() => setShowContact(true)}>
                            Contact us
                        </button>

                        {/* Register Now Button (Opens Google Form) */}
                        <button className="px-4 py-2  w-full lg:w-1/2 bg-orange-500 text-white font-bold rounded-lg" onClick={() => window.open("https://forms.gle/your-google-form-link", "_blank")}>
                            Register Now
                        </button>
                    </div>
                </div>

            </div>
            {/* Show Contact Popup When Needed */}
            {showContact && <ContactPopup1 className="" onClose={() => setShowContact(false)} />}
        </div>
    );
};

export default PopupProgram;
