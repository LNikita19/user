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
        <div className="bg-[#FFF4C0] h-auto flex flex-col items-center py-10 px-5 rounded-lg">
            <p className='text-[#FD8531] font-bold md:text-[24px] text-[20px] font-david uppercase'>Online  Classes</p>
            <h1 className='text-[#361A06] md:text-[64px]  text-[32px] font-david font-bold text-center mb-6'>Discover & Register<br />For Our Online Classes</h1>

            <div className="border-2 border-[#361A0680] p-6 rounded-xl">
                <div className="bg-white rounded-xl shadow-lg p-5 max-w-4xl w-full ">
                    <img src={classData.Photo} alt={classData.selectProgram} className="rounded-xl w-full" />
                    <div className="mt-4 space-y-2">
                        <p className="text-[#FD8531] font-david md:text-[24px] text-[16px] font-bold uppercase text-sm">Training Online</p>
                        <h2 className=" text-[#361A06] font-david md:text-[48px] text-[24px] font-bold">{classData.selectProgram}</h2>
                        <p className="text-[#361A06] font-david mt-2 font-medium text-[16px] md:text-[20px]">{classData.Description}</p>
                        <ul className="mt-3 font-jakarta space-y-1 font-bold md:text-[20px] text-[14px] text-[#361A06] text-sm">
                            <li><b>From: {formatDate(classData.startDate)} - {formatDate(classData.endDate)}</b></li>
                            <li><b>Duration: {calculateDuration(classData.startDate, classData.endDate)}</b> {/* Calculate duration if needed */}</li>
                        </ul>
                    </div>

                    <button
                        className="w-full mt-4 bg-[#FD8531] text-[#FFF9E1] py-2 text-[16px] md:text-[24px] font-extrabold rounded-xl text-lg"
                        onClick={() => setShowPopup(true)}
                    >
                        Enroll Now
                    </button>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed z-50 inset-0 bg-[#FFFFFF]  flex items-center justify-center p-8">
                    <div className="border-2 border-[#ecd8ca80] p-8 rounded-xl">
                        <div className=" py-4 px-8 rounded-lg w-full max-w-xl max-h-[150vh] overflow-auto bg-white shadow-xl relative">
                            {/* Close Button */}
                            <button
                                className="absolute top-0 -right-0 text-[#361A06] border-2 border-black px-2 py-1 rounded-full"
                                onClick={() => setShowPopup(false)}
                            >
                                ✖
                            </button>

                            {/* Image */}
                            <img src={classData.Photo} alt={classData.selectProgram} className="rounded-lg w-full h-auto  object-cover" />

                            {/* Training Label */}
                            <p className="text-[#FD8531] font-david text-lg font-bold uppercase mt-2">Training Online</p>

                            {/* Title */}
                            <h2 className="text-[24px] md:text-[28px] font-david font-bold mt-1">{classData.selectProgram}</h2>

                            {/* Details List */}
                            <ul className="mt-2 space-y-1 text-[#361A06] font-jakarta text-[14px] list-disc pl-5">
                                <li><b>Date:</b> {classData.startDate} - {classData.endDate}</li>
                                <li><b>Session Timings:</b> {classData.programTiming}</li>
                                <li><b>Language:</b> {classData.selectLanguage}</li>
                                <li><b>Program Fee:</b> {classData.programFees}</li>
                            </ul>

                            {/* FAQ Section */}
                            <h3 className="mt-4 mb-4 text-lg font-david text-[20px] md:text-[24px] text-[#361A06] font-bold">
                                FAQs (Important Please Read)
                            </h3>
                            <div className="mt-2 text-[#361A06]">
                                {/* Check if faqList exists and is an array */}
                                {classData.faq && Array.isArray(classData.faq) && classData.faq.map((faq, index) => (
                                    <div key={index} className="mb-2">
                                        <button
                                            className="w-full text-left bg-white p-2 rounded-lg flex justify-between items-center text-[#361A06] border-2 border-[#a7938680]"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            <div className="flex flex-col w-full">
                                                <span>{faq.question}</span>
                                                {openFAQ === index && (
                                                    <span className="mt-2 text-[#555] text-[14px]">{faq.answer}</span>
                                                )}
                                            </div>
                                            <span className="text-sm">{openFAQ === index ? "▲" : "▼"}</span>
                                        </button>
                                    </div>
                                ))}

                                {/* Handle the case where faqList is not available or not an array */}

                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-4">
                                <button
                                    className="px-4 py-2 w-full md:w-1/2 border border-[#f8c6a2] text-[#FD8531] font-jakarta font-bold text-[16px] rounded-lg"
                                    onClick={() => setShowContactPopup(true)} // Open ContactPopup
                                >
                                    Contact us
                                </button>
                                <button className="px-4 py-2 w-full md:w-auto bg-[#FD8531] border border-white text-[#FFF9E1] font-bold font-jakarta text-[16px] rounded-lg whitespace-nowrap">
                                    Watch Demo on YouTube
                                </button>
                            </div>

                            <button
                                className="w-full bg-[#361A06] text-[#FFF9E1] py-2 rounded-lg text-[18px] font-bold mt-4"
                                onClick={() => setShowContact1Popup(true)} // Open Contact1Popup
                            >
                                Book Now
                            </button>

                            {/* Render Popups Conditionally */}
                            {showContactPopup && <ContactPopup1 onClose={() => setShowContactPopup(false)} />}
                            {showContact1Popup && <ContactPopup onClose={() => setShowContact1Popup(false)} />}
                        </div>
                    </div>
                </div>
            )}

            <Author />
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