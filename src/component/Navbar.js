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
        // <div className="relative w-full md:min-h-screen min-h-screen overflow-hidden">
        //     {/* Background Image */}
        //     <img
        //         src="/Background.png"
        //         alt="Background"
        //         className="absolute w-full h-full object-cover"
        //     />


        //     {/* Navbar */}
        //     <div className="absolute  w-full flex flex-col items-center lg:flex-row lg:justify-around lg:items-center px-10 py-5 border-b border-white/20 z-40">
        //         <img src="/Logo 1.png" alt="Logo" className="w-40 mx-auto lg:mx-0 select-none" />
        //         <button
        //             className="font-PlusJakartaSans font-bold hidden lg:block bg-[#361A06] text-white border border-[#FFF9E180] px-6 py-2 rounded-md select-none cursor-pointer relative z-10"
        //             onClick={() => {
        //                 console.log("Contact button clicked");
        //                 setShowPopup(true);
        //             }}
        //             onMouseDown={(e) => e.preventDefault()}
        //         >
        //             CONTACT<span className="ml-2">US</span>
        //         </button>

        //         {showPopup && (
        //             <>
        //                 {/* Blurred Backdrop */}
        //                 <div
        //                     className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        //                     onClick={() => setShowPopup(false)}
        //                 />

        //                 {/* Popup Container */}
        //                 <div className="fixed inset-0 flex items-center justify-center z-50">
        //                     <ContactPopup onClose={() => setShowPopup(false)} />
        //                 </div>
        //             </>
        //         )}
        //     </div>



        //     <div className="relative flex flex-col items-center justify-center h-full text-center text-white space-y-4 px-5 pt-32 select-none">
        //         <p className="text-[#FD8531] font-bold font-david uppercase font-plusjakarta text-[20px] md:text-3xl break-words whitespace-normal text-center">
        //             {smallHeading}
        //         </p>
        //         <h1 className="font-bold text-[32px] font-david md:text-6xl leading-tight mt-2 max-w-2xl break-words text-center select-none">
        //             {mainHeading}
        //         </h1>

        //         <p className="text-[#FFF9E1] font-medium font-david text-base md:text-lg max-w-xl mt-4 break-words text-center">
        //             {description}
        //         </p>
        //         <button
        //             onClick={() => {
        //                 document.getElementById("Programs")?.scrollIntoView({
        //                     behavior: "smooth",
        //                     block: "start",
        //                 });
        //             }}
        //             className="text-[#361A06] font-jakarta bg-[#FD8531] text-[12px] lg:mb-16 md:text-[20px] px-6 py-3 mt-6 rounded-md text-lg font-semibold"
        //         >
        //             SEE ALL COURSES
        //         </button>

        //     </div>
        //     {/* Person & Round Background */}
        //     <div className="hidden lg:block absolute  bottom-0 left-1/2 lg:transform -translate-x-1/2 flex flex-col items-center">
        //         {/* <img
        //             src="/rounds.png"
        //             alt="Round Background"
        //             className="absolute w-[250px] sm:w-[350px] md:w-[500px] lg:w-[600px] -bottom-5"
        //         /> */}
        //         <img
        //             src="/person.webp"
        //             alt="Person"
        //             className="relative z-10  w-full md:w-[500px] lg:w-[600px]"
        //         />

        //     </div>

        //     <div className="lg:hidden block relative flex justify-center mt-6 md:mt-12 lg:mt-32 ">
        //         <img
        //             src="/person.webp"
        //             alt="Person"
        //             className="w-[80%] md:w-[50%] max-w-[400px] "
        //         />

        //         {/* Phone Icon */}
        //         <button
        //             onClick={() => setShowContact(true)}
        //             className="lg:hidden block md:right-12 md:bottom-10 bg-brown-700 p-3 rounded-full fixed right-0 bottom-24 lg:bottom-32 hover:scale-105 z-50"
        //         >
        //             <img src="/Phone.png" alt="Call" className="w-12 h-12" />
        //         </button>
        //     </div>


        //     {/* Contact Popup */}
        //     {showContact && (
        //         <>
        //             {/* Blurred Backdrop */}
        //             <div
        //                 className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        //                 onClick={() => setShowContact(false)}
        //             />

        //             {/* Popup Container */}
        //             <div className="fixed inset-0 flex items-center justify-center z-50">
        //                 <ContactPopup onClose={() => setShowContact(false)} />
        //             </div>
        //         </>
        //     )}

        // </div>
        <div className="relative w-full min-h-screen overflow-hidden pb-[220px] md:pb-[250px] lg:pb-[280px]">
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
                    className="font-PlusJakartaSans font-bold hidden lg:block bg-[#361A06] text-white border border-[#FFF9E180] px-6 py-2 rounded-md select-none cursor-pointer relative z-10"
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
                    className="w-[60%] md:w-[45%] lg:w-[35%] max-w-[500px] object-contain"
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

    );
};

export default Navbar;
