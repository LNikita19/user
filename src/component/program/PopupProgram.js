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
        <div className="fixed z-50 inset-0 bg-[#FFFFFF]  flex items-center justify-center p-8">
            <div className="border-2 border-[#ecd8ca80] p-8 rounded-xl">

                <div className=" py-4 px-8 rounded-lg w-full max-w-xl max-h-[150vh] overflow-auto bg-white shadow-xl relative">
                    {/* Close Button */}
                    <button className="absolute top-4 right-2 text-[#361A06]" onClick={onClose}>✖</button>

                    {/* Program Details */}
                    <img src={program.Photo} alt="Program" className="rounded-lg w-full h-auto  object-cover" />

                    {/* Quote */}
                    <p className="italic text-center text-[#361A06] mt-3">
                        {program.Quto || "Angamardana is a powerful system to bring the human mechanism to ultimate health and well-being."}
                        <br />
                        — <b className="text-[#361A06] font-david italic">Sadhguru</b>
                    </p>

                    {/* Program Details */}
                    <div className="mt-4 text-left">
                        <h3 className="text-orange-500 font-bold uppercase text-sm">About</h3>
                        <h2 className="text-xl font-bold text-[#361A06]">{program.selectProgram || "Program"}</h2>
                        <p className="text-[#361A06] mt-2">{program.Description || "Lorem Ipsum is simply dummy text."}</p>

                        <ul className="mt-2 space-y-1 text-[#361A06] font-jakarta text-[14px] list-disc pl-5">
                            <li><b>Date:</b>                                      {formatDate(program.startDate) - formatDate(program.endDate) || " 09th Jan 2025"}
                            </li>
                            <li><b>Session Timing:</b> {program.programTiming || "06:00 - 09:00 AM"}</li>
                            <li><b>Language:</b> {program.selectLanguage | "English"}</li>
                            <li><b>Program Fee:</b> {program.programFees || "₹ 8500 INR"}</li>
                        </ul>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-5">
                        <h3 className="mt-4 mb-4 text-lg font-david text-[20px] md:text-[24px] text-[#361A06] font-bold">
                            FAQs (Important Please Read)
                        </h3>
                        {program.faq && program.faq.map((faq, index) => (
                            <div key={index} className="mb-2 border-2 border-[#361A0680] rounded-lg">
                                <button
                                    className="w-full text-left px-4 py-2 bg-gray-100 flex justify-between items-center"
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
                    <div className="flex justify-between mt-5">
                        {/* Contact Us Button */}
                        <button
                            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg"
                            onClick={() => setShowContact(true)}
                        >
                            Contact us
                        </button>

                        {/* Register Now Button (Opens Google Form) */}
                        <button
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                            onClick={() => window.open("https://forms.gle/your-google-form-link", "_blank")}
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
            {/* Show Contact Popup When Needed */}
            {showContact && <ContactPopup1 onClose={() => setShowContact(false)} />}
        </div>
    );
};

export default PopupProgram;
