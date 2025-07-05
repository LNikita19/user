import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import ContactPopup from "./program/ContactPopup"; // Import ContactPopup

const Navbar = () => {
    const [smallHeading, setSmallHeading] = useState("");
    const [mainHeading, setMainHeading] = useState("");
    const [description, setDescription] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        getHeroData();
    }, []);
    const getHeroData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getData`);
            console.log("API Response:", response.data);

            if (response.data.status) {
                const data = response.data.data || {}; // Ensure data is always an object
                console.log("Extracted Data:", data);

                setSmallHeading(data?.SmallHeading?.trim() ? data.SmallHeading : "Shyama Yoga Studio");
                setMainHeading(data?.Heading?.trim() ? data.Heading : "Clear Mind & Refresh Your Body");
                setDescription(data?.Description?.trim() ? data.Description : "Lorem Ipsum...");
            }
        } catch (e) {
            console.error("Error fetching data:", e);

            // If API call fails, set default values
            setSmallHeading("Shyama Yoga Studio");
            setMainHeading("Clear Mind & Refresh Your Body");
            setDescription("Lorem Ipsum is simply dummy text of the printing and ypesetting industry. Lorem Ipsum has been the industry's ");
        }
    };

    return (
        <>
            <div className="lg:hidden relative w-full md:min-h-screen xl:min-h-screen lg:min-h-screen 2xl:min-h-screen 3xl:min-h-screen sm:min-h-[80vh] overflow-hidden pb-[280px] md:pb-[280px] xl:pb-[350px]">
                {/* Background Image */}
                <img
                    src="/Background.png"
                    alt="Background"
                    className="absolute w-full h-full object-cover"
                />

                {/* Navbar */}
                <div className="absolute w-full flex flex-col items-center lg:flex-row lg:justify-around lg:items-center px-10 py-5 border-b border-white/20 z-40">
                    <img src="/Logo 1.png" alt="Logo" className="w-40 mx-auto lg:mx-0 select-none" />
                    <button
                        className="font-PlusJakartaSans font-bold hidden lg:block bg-[#FD8531] text-white border border-[#FFF9E180] px-6 py-2 rounded-md select-none cursor-pointer relative z-10"
                        onClick={() => setShowPopup(true)}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        CONTACT<span className="ml-2">US</span>
                    </button>
                </div>

                {/* Main Text */}
                <div className="relative flex flex-col items-center justify-center h-full text-center text-white space-y-4 px-5 pt-32 md:pt-40 lg:pt-48">
                    <p className="text-[#FD8531] font-bold font-david uppercase font-plusjakarta text-[20px] md:text-3xl break-words">
                        {smallHeading}
                    </p>
                    <h1 className="font-bold text-[32px] font-david md:text-6xl leading-tight mt-2 max-w-2xl break-words">
                        {mainHeading}
                    </h1>
                    <p className="text-[#FFF9E1] font-medium font-david text-base md:text-lg max-w-xl mt-4 break-words">
                        {description}
                    </p>
                    <button
                        onClick={() => {
                            document.getElementById("Programs")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }}
                        className="text-[#361A06] font-jakarta bg-[#FD8531] text-[12px] md:text-[20px] px-6 py-3 mt-6 rounded-md text-lg font-semibold"
                    >
                        SEE ALL COURSES
                    </button>
                </div>

                {/* Centered Person Image */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full flex justify-center">
                    <img
                        src="/person.webp"
                        alt="Person"
                        className="w-[65%] sm:w-[50%] md:w-[45%] lg:w-[35%] xl:w-[30%] max-w-[600px]"
                    />

                </div>

                {/* Mobile Contact Button */}
                <button
                    onClick={() => setShowContact(true)}
                    className="lg:hidden block bg-brown-700 p-3 rounded-full fixed right-4 bottom-24 hover:scale-105 z-50"
                >
                    <img src="/Phone.png" alt="Call" className="w-12 h-12" />
                </button>

                {/* Contact Popups */}
                {showPopup && (
                    <>
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                            onClick={() => setShowPopup(false)}
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <ContactPopup onClose={() => setShowPopup(false)} />
                        </div>
                    </>
                )}

                {showContact && (
                    <>
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                            onClick={() => setShowContact(false)}
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <ContactPopup onClose={() => setShowContact(false)} />
                        </div>
                    </>
                )}
            </div>
            <div className="hidden lg:block relative w-full min-h-screen overflow-hidden bg-black text-white">
                {/* Background Image */}
                <img
                    src="/Background.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Main Container */}
                <div className="relative z-10 flex flex-col justify-between min-h-screen px-4 pt-8">

                    {/* ✅ Centered Navbar */}
                    <div className="w-full flex justify-center px-4 py-4 border-b border-white/20">
                        <div className="flex items-center justify-between w-full max-w-6xl px-4">
                            <img src="/Logo 1.png" alt="Logo" className="w-40 select-none" />
                            <button
                                className="hidden lg:block bg-[#FD8531] text-white font-bold px-6 py-2 rounded-md"
                                onClick={() => setShowPopup(true)}
                            >
                                CONTACT <span className="ml-1">US</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Text + Button */}
                    <div className="flex flex-col items-center justify-center text-center flex-grow space-y-4 mt-4">
                        <p className="text-[#FD8531] font-david uppercase text-xl md:text-3xl break-words">
                            {smallHeading}
                        </p>
                        <h1 className="text-3xl md:text-6xl font-david font-bold max-w-2xl break-words leading-tight">
                            {mainHeading}
                        </h1>
                        <p className="text-[#FFF9E1] font-david text-base md:text-lg max-w-xl break-words">
                            {description}
                        </p>
                        <button
                            onClick={() => {
                                document.getElementById("Programs")?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
                            className="bg-[#FD8531] text-[#361A06] text-lg md:text-xl px-6 py-3 rounded-md font-semibold mt-4"
                        >
                            SEE ALL COURSES
                        </button>
                    </div>

                    {/* Person Image at Bottom */}
                    <div className="flex justify-center">
                        <img
                            src="/person.webp"
                            alt="Person"
                            className="w-[65%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] max-w-[600px] object-contain"
                        />
                    </div>
                </div>

                {/* Mobile Contact Button */}
                <button
                    onClick={() => setShowContact(true)}
                    className="lg:hidden fixed bottom-24 right-4 bg-brown-700 p-3 rounded-full hover:scale-105 z-50"
                >
                    <img src="/Phone.png" alt="Call" className="w-12 h-12" />
                </button>

                {/* Popups */}
                {showPopup && (
                    <>
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <ContactPopup onClose={() => setShowPopup(false)} />
                        </div>
                    </>
                )}
                {showContact && (
                    <>
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <ContactPopup onClose={() => setShowContact(false)} />
                        </div>
                    </>
                )}
            </div>

        </>

    );
};

export default Navbar;



