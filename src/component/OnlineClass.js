import React, { useState, useEffect } from "react";
import ContactPopup from "./program/ContactPopup";
import ContactPopup1 from "./program/Contactpopup1";
import Author from "./Author";
import axios from "axios";
import { API_BASE_URL } from "../config";

const OnlineClass = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [showContact1Popup, setShowContact1Popup] = useState(false);
    const [classData, setClassData] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const calculateDuration = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end days
        return `${diffDays} Days`;
    };
    useEffect(() => {
        fetchClassData();
    }, []);

    const fetchClassData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getonlineData`);
            if (response.data.data && response.data.data.length > 0) {
                setClassData(response.data.data[0]); // Assuming you want to display the first class
            }
        } catch (error) {
            console.error("Error fetching class data:", error);
        }
    };

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    if (!classData) {
        return <div className="text-center py-8">Loading...</div>; // Or handle loading state as needed
    }

    return (
        <div className="bg-[#FFF4C0] h-full flex flex-col items-center py-10 px-5 rounded-lg">
            <p className='text-[#FD8531] font-bold md:text-[24px] text-[20px] font-david uppercase'>Online  Classes</p>
            <h1 className='text-[#361A06] md:text-[64px] mt-2  md:mt-4 text-[32px] font-david font-bold text-center mb-6 leading-[0.9]'>
                <span>Discover & Register</span><br />
                <span>For Our Online Classes</span>
            </h1>

            <div className="border-2 border-[#361A0680] p-6 rounded-xl mt-4">
                <div className="bg-white rounded-xl shadow-lg p-5 max-w-4xl w-full ">
                    <img src={classData.Photo} alt={classData.selectProgram} className="rounded-xl w-full" />
                    <div className="mt-4 space-y-2">
                        <p className="text-[#FD8531] font-david md:text-[24px]  md:mt-6 mt-2 text-[16px] mb-[-1rem] font-bold uppercase text-sm">Training Online</p>
                        <h2 className="text-[#361A06] font-david md:text-[48px] text-[24px] font-bold mb-8">
                            {classData.selectProgram}
                        </h2>
                        <p className="text-[#361A06] font-david font-medium text-[16px] md:text-[20px] -mt-4">
                            {classData.Description}
                        </p>

                        <ul className="mt-3 font-jakarta space-y-1 font-bold md:text-[20px] text-[14px] text-[#361A06] text-sm">
                            <li><b>From: {formatDate(classData.startDate)} - {formatDate(classData.endDate)}</b></li>
                            <li><b>Duration: {calculateDuration(classData.startDate, classData.endDate)}</b> {/* Calculate duration if needed */}</li>
                        </ul>
                    </div>

                    <button
                        className="w-full mt-4 bg-[#FD8531] text-[#FFF9E1] py-2 text-[16px] md:text-[24px] font-extrabold rounded-xl text-lg"
                        onClick={() => setShowPopup(true)}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
                    {/* Outer Container for the Popup with max-width and max-height */}
                    <div className="relative border-2 border-[#361A0680] lg:p-6 p-4 rounded-xl bg-white shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
                        {/* Close Button - fixed relative to this outer container */}
                        <button
                            className="absolute top-2 right-2 text-[#361A06] border-2 border-black px-2 py-1 rounded-full z-10" // Adjusted position and added z-index
                            onClick={() => setShowPopup(false)}
                        >
                            ✖
                        </button>

                        {/* Scrollable Content Area */}
                        <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar leading-[1.0]"> {/* Added flex-grow, overflow-y-auto, pr-4, custom-scrollbar */}
                            {/* Image */}
                            <div className="relative w-full max-h-60 overflow-hidden rounded-lg">
                                <img src={classData.Photo} alt={classData.selectProgram} className="rounded-lg w-full h-auto object-cover" />
                                {/* Blur Gradient Overlay */}
                                <div className="absolute -bottom-0 left-0 w-full h-1/2"
                                    style={{ background: "linear-gradient(0deg, #FFFFFF 9.9%, rgba(255, 255, 255, 0.02) 20.71%)" }}>
                                </div>
                            </div>
                            {/* Training Label */}
                            <p className="text-[#FD8531] font-david text-lg font-bold uppercase mt-2">Training Online</p>

                            {/* Title */}
                            <h2 className="text-[24px] md:text-[28px] font-david font-bold mt-1">{classData.selectProgram}</h2>

                            {/* Details List */}
                            <ul className="mt-2 space-y-1 text-[#361A06] font-jakarta text-[14px] hidden lg:block">
                                {[
                                    { label: "Date", value: `${formatDate(classData.startDate)} - ${formatDate(classData.endDate)}` },
                                    { label: "Session Timings", value: classData.programTiming },
                                    { label: "Language", value: classData.selectLanguage },
                                    { label: "Program Fee", value: classData.programFees },
                                ].map((item, index) => (
                                    <li key={index} className="grid grid-cols-[1fr_10px_2fr] items-start text-start ">
                                        <span className="font-bold text-[#361A06] ">
                                            • {item.label}
                                        </span>
                                        <span className="text-start font-bold text-[#361A06]">:</span>
                                        <span className="text-[#361A06] text-start ml-2">
                                            {item.label === "Program Fee" ? `${item.value} INR` : item.value}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <ul className="lg:hidden mt-2 space-y-1 text-[#361A06] font-jakarta text-[14px] list-disc pl-5">
                                <li><b>Date:</b> {formatDate(classData.startDate)} - {formatDate(classData.endDate)}</li>
                                <li><b>Session Timings:</b> {classData.programTiming}</li>
                                <li><b>Language:</b> {classData.selectLanguage}</li>
                                <li><b>Program Fee:</b> {classData.programFees}INR</li>
                            </ul>

                            {/* FAQ Section */}
                            <h3 className="mt-4 mb-4 text-lg font-david text-[20px] md:text-[24px] text-[#361A06] whitespace-nowrap font-bold">
                                FAQs (Important Please Read)
                            </h3>
                            <div className="mt-2 text-[#361A06]">
                                {classData.faq && Array.isArray(classData.faq) && classData.faq.map((faq, index) => (
                                    <div key={index} className="mb-2">
                                        <button
                                            className="w-full text-left bg-white p-2 rounded-lg flex justify-between items-start text-[#361A06] border-2 border-[#a7938680]"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            <div className="flex flex-col flex-grow">
                                                <span className="text-[#361A06B2]">{faq.question}</span>
                                                {openFAQ === index && (
                                                    <ul className="px-4 py-2 bg-white border-t list-disc ml-5 space-y-1">
                                                        {faq.answer.split("•").map((point, i) =>
                                                            point.trim() && <li key={i}>{point.trim()}</li>
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                            <div className="ml-4 flex-shrink-0 w-6 text-center">
                                                <span className="text-sm">{openFAQ === index ? "▲" : "▼"}</span>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {/* Spacer to push content up if needed (optional) */}
                            <div className="pb-4"></div> {/* Add some padding at the bottom of the scrollable area */}
                        </div>

                        {/* Buttons (Fixed at the bottom of the popup) */}
                        <div className="mt-4 flex flex-col md:flex-row justify-between md:space-x-4 bg-white pt-4 border-t-2 border-[#361A061A]"> {/* Added mt-4, bg-white, pt-4, border-t-2 */}
                            <button
                                className="px-4 py-2 w-full lg:w-1/2 border border-orange-500 font-bold text-orange-500 bg-[#FFF9E1] rounded-xl" // Added mb-2 md:mb-0 for spacing
                                onClick={() => setShowContactPopup(true)}
                            >
                                Contact us
                            </button>
                            <button className="px-4 py-2 w-full md:w-auto bg-[#FD8531] border border-white text-[#FFF9E1] font-bold font-jakarta text-[16px] rounded-lg whitespace-nowrap">
                                Watch video on YouTube
                            </button>
                        </div>

                        <button
                            className="w-full bg-[#361A06] text-[#FFF9E1] py-2 rounded-lg text-[18px] font-bold mt-4"
                            onClick={() => setShowContact1Popup(true)}
                        >
                            Book Now
                        </button>


                        {/* Render Popups Conditionally */}
                        {showContactPopup && <ContactPopup1 onClose={() => setShowContactPopup(false)} />}
                        {showContact1Popup && <ContactPopup onClose={() => setShowContact1Popup(false)} />}
                    </div>
                </div>
            )}

        </div>
    );
};

export default OnlineClass;


{/* <div className="flex flex-col md:flex-row justify-center lg:mt-44 lg:mb-0 md:mt-44 mt-16 md:mb-1 mb-14 items-center space-y-6 md:space-x-6 lg:space-x-20 md:gap-4 lg:gap-20 px-4">
<div className="lg:max-w-xl md:max-w-md text-center md:text-left font-david">
    <p className="text-[#FD8531] font-bold md:text-[24px] uppercase text-[20px]">Instructor</p>
    <h1 className="text-[#361A06] font-bold md:text-[48px] text-[32px]">
        Meet Our Talented Instructor
    </h1>
    <div className="text-[#361A06] font-normal md:text-[20px] text-[16px] space-y-4">
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
        </p>
        <p>
            Dummy. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
        </p>
    </div>
</div>

<div className="flex justify-center items-center w-full md:w-1/2">
    <img
        src="/main.webp"
        alt="Round Background"
        className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] max-w-full"
    />
</div>
</div> */}