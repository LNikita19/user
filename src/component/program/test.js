import React, { useState, useEffect } from "react";
import ContactPopup1 from "./Contactpopup1";
import axios from "axios";
import { API_BASE_URL } from "../../config";
const PopupProgram = ({ onClose, program }) => {
    const [openFAQ, setOpenFAQ] = useState(null);
    const [showContact, setShowContact] = useState(false);

    if (!program) {
        return <div className="text-center py-8">Program data not found.</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
                {/* Close Button */}
                <button className="absolute top-4 right-2 text-[#361A06]" onClick={onClose}>✖</button>

                {/* Program Details */}
                <img src={program.Photo} alt="Program" className="w-full rounded-xl" />

                {/* Quote */}
                <p className="italic text-center text-[#361A06] mt-3">
                    "{program.Quto}"<br />
                    — <b>{program.Quto}</b>
                </p>

                {/* Program Details */}
                <div className="mt-4 text-left">
                    <h3 className="text-orange-500 font-bold uppercase text-sm">About</h3>
                    <h2 className="text-xl font-bold text-[#361A06]">{program.selectProgram}</h2>
                    <p className="text-[#361A06] mt-2">{program.Description}</p>

                    <ul className="mt-3 space-y-1 text-[#361A06]">
                        <li><b>Date:</b> {program.startDate} - {program.endDate}</li>
                        <li><b>Session Timing:</b> {program.programTiming}</li>
                        <li><b>Language:</b> {program.selectLanguage}</li>
                        <li><b>Program Fee:</b> {program.programFees}</li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-5">
                    <h3 className="font-bold text-lg">FAQs (Important Please Read)</h3>
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
            </div>
        </div>
    );
};

export default PopupProgram;
