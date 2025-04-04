
import React, { useState, useEffect } from "react";
import ContactPopup1 from "./Contactpopup1";

const Combopopup = ({ onClose, program }) => {
    const [showContact, setShowContact] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);

    if (!program) {
        return <div className="text-center py-8">Loading...</div>;
    }

    const fee1 = parseInt(program.programFees) || 0;
    const fee2 = parseInt(program.programFees1) || 0;
    const totalFee = fee1 + fee2;

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="border-2 border-[#ecd8ca80] p-6 mt-4 lg:mt-0 rounded-xl bg-white shadow-xl w-full sm:max-w-lg md:max-w-xl max-h-screen overflow-y-auto relative">

                {/* Close Button */}
                <button className="absolute z-50 top-4 right-4 text-[#361A06] bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md" onClick={onClose}>
                    ✖
                </button>
                {/* <img src={program.Photo} alt="Program" className="w-full max-h-60 object-contain rounded-xl" /> */}

                {/* Program Image */}
                <div className="relative w-full max-h-60 overflow-hidden rounded-lg">
                    <img src={program.Photo} alt="Program" className="w-full h-full object-cover" />
                    {/* Blur Gradient Overlay */}
                    <div className="absolute -bottom-0 left-0 w-full h-1/2"
                        style={{ background: "linear-gradient(0deg, #FFFFFF 9.9%, rgba(255, 255, 255, 0.02) 20.71%)" }}>
                    </div>
                </div>
                {/* Quote */}
                <p className="italic text-center text-[#361A06] mt-3">
                    "{program.Quto}"<br />
                    — <b className="text-[#361A06] font-david italic">Sadhguru</b>
                </p>
                <p className="italic text-center text-[#361A06] mt-3">
                    "{program.Quto1}"
                </p>

                {/* Program Details */}
                <div className="mt-4 text-left">
                    <h3 className="text-orange-500 font-bold uppercase text-sm">About</h3>
                    <h2 className="text-xl font-bold text-[#361A06]">{program.selectProgram}</h2>
                    <p className="text-[#361A06] mt-2">{program.Description}</p>

                    <ul className="mt-3 space-y-1 text-[#361A06] font-jakarta text-[14px]">
                        {[
                            { label: "Date", value: `${formatDate(program.startDate)} - ${formatDate(program.endDate) || "09th Jan 2025"}` },
                            { label: "Session Timing", value: program.programTiming },
                            { label: "Language", value: program.selectLanguage },
                            { label: "Program Fee", value: `${formatCurrency(fee1)} + ${formatCurrency(fee2)} = ${formatCurrency(totalFee)}` },
                        ].map((item, index) => (
                            <li key={index} className="grid grid-cols-[1fr_10px_2fr] items-start text-start ">
                                <span className="font-bold text-[#361A06] ">
                                    • {item.label}
                                </span>
                                <span className="text-start font-bold text-[#361A06]">:</span>
                                <span className="text-[#361A06] text-start ml-2">{item.value}</span>
                            </li>
                        ))}
                    </ul>

                </div>

                {/* FAQ Section */}
                <div className="mt-5">
                    <h3 className="text-orange-500 font-bold uppercase text-sm">FAQs</h3>
                    <div className="mt-2">
                        {program.faq && program.faq.map((faq, index) => (
                            <div key={index} className="mb-2 border-2 border-[#361A0680] rounded-lg">
                                <button
                                    className="w-full text-left px-4 py-2 bg-white flex justify-between items-center"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.question}
                                    <span className="text-xs text-[#361A06B2]">{openFAQ === index ? "▲" : "▼"}</span>
                                </button>
                                {openFAQ === index && <p className="px-4 py-2 bg-white border-t">{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-5">
                    <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg" onClick={() => setShowContact(true)}>
                        Contact us
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg" onClick={() => window.open("https://forms.gle/your-google-form-link", "_blank")}>
                        Register Now
                    </button>
                </div>
            </div>

            {showContact && <ContactPopup1 onClose={() => setShowContact(false)} />}
        </div>

    );
};

export default Combopopup;
