import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { FaCircle } from "react-icons/fa";

// Default static data (if admin has not added any)
const defaultData = {
    Heading: "Clear Mind & Refresh Your Body",
    Description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    PhotoCarousel: ["/p1.png", "/Image3.png", "/p1.png"], // Default images
    Points: ["Neck Pain", "Peace", "Happiness"],
};

const About = () => {
    const [aboutData, setAboutData] = useState(defaultData); // Ensures default values
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/getaboutData`);

                if (response.data.status && response.data.data) {
                    const fetchedData = response.data.data;

                    // Ensure correct image URLs
                    const processImagePath = (path) =>
                        path?.startsWith("/") ? `${API_BASE_URL}${path}` : path;

                    setAboutData({
                        Heading: fetchedData.Heading || defaultData.Heading,
                        Description: fetchedData.Description || defaultData.Description,
                        PhotoCarousel: [processImagePath(fetchedData.Photo), processImagePath(fetchedData.Photo1)]
                            .filter(Boolean).length > 0
                            ? [processImagePath(fetchedData.Photo), processImagePath(fetchedData.Photo1)].filter(Boolean)
                            : defaultData.PhotoCarousel, // Use backend photos or fallback
                        Points: defaultData.Points, // Static points for now
                    });
                } else {
                    console.warn("No about data found, using defaults.");
                }
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };

        fetchData();

        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-scroll image carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) =>
                (prev + 1) % aboutData.PhotoCarousel.length
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [aboutData]);

    return (
        <>
            <div className="bg-[#FFF4C0] font-david flex flex-col">

                <div className=" p-6 flex justify-center mt-8">
                    <div className="border border-[#361A0640] rounded-xl p-6 shadow-lg bg-white w-[90%] md:w-[60%] flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 text-start md:text-left px-6">
                            <h2 className="text-[#D17A0E]  uppercase md:text-[24px] text-[16px] font-bold">SHYAMA YOGA STUDIO</h2>
                            <h1 className="md:text-[48px] text-[24px] font-bold mt-2">{aboutData.Heading}</h1>
                            <p className="text-[#361A06] text-[20px] mt-2">{aboutData.Description}</p>
                            <ul className="mt-4 list-disc list-inside space-y-1 text-[#361A06] text-[16px] md:text-[20px]">
                                {aboutData.Points?.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Image Carousel */}
                        <div className="md:w-1/2 flex flex-col items-center relative mt-4 md:mt-0 min-h-[300px] md:min-h-[400px]">
                            <div className="relative w-72 md:w-11/12 h-72 md:h-80 overflow-hidden rounded-lg">
                                {aboutData.PhotoCarousel?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Yoga"
                                        className={`absolute w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-500 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                ))}
                            </div>
                            {/* Dots Indicator */}
                            <div className="flex justify-center space-x-2 mt-4">
                                {aboutData.PhotoCarousel?.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentImageIndex === index ? "bg-[#D17A0E]" : "bg-gray-300"}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col gap-10 font-david lg:flex-row space-y-2 mb-10 justify-center items-center text-[#361A06] mt-10">
                    <div className="flex flex-col items-center mx-4">
                        <img src="/Icon 1.png" alt="Healthy" className="w-16 h-16 mb-2" />
                        <h1 className="font-bold text-[24px] md:text-[44px]">Healthy</h1>
                        <p className="text-center md:text-[24px] text-[16px] font-normal max-w-xs">Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing.</p>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <img src="/Icon 2.png" alt="Flexibility" className="w-16 h-16 mb-2" />
                        <h1 className="font-bold text-[24px] md:text-[44px]">Flexibility</h1>
                        <p className="text-center md:text-[24px] text-[16px] font-normal max-w-xs">Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing.</p>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <img src="/Icon 3.png" alt="Balance" className="w-16 h-16 mb-2" />
                        <h1 className="font-bold text-[24px] md:text-[44px]">Balance</h1>
                        <p className="text-center md:text-[24px] text-[16px] font-normal max-w-xs">Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
