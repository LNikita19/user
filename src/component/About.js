import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const defaultData = {
    Heading: "Clear Mind & Refresh Your Body",
    Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    PhotoCarousel: ["/p1.png", "/Image3.png"], // Default images
    Points: ["Neck Pain", "Peace", "Happiness"],
};

const About = () => {
    const [aboutData, setAboutData] = useState(defaultData);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/getaboutData`);
                if (response.data.status && response.data.data) {
                    const fetchedData = response.data.data;

                    setAboutData({
                        Heading: fetchedData.Heading || defaultData.Heading,
                        Description: fetchedData.Description || defaultData.Description,
                        // Directly use base64 data
                        PhotoCarousel: fetchedData.Photos && fetchedData.Photos.length > 0
                            ? fetchedData.Photos
                            : defaultData.PhotoCarousel,
                        Points: defaultData.Points, // Static for now
                    });
                } else {
                    console.warn("No about data found, using defaults.");
                }
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % aboutData.PhotoCarousel.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [aboutData]);

    return (
        <div className="bg-[#FFF4C0] font-david flex flex-col">
            <div className="p-6 flex justify-center mt-8">
                <div className="border border-[#361A0640] rounded-xl p-6 shadow-lg bg-white w-full md:w-[55%] flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-start md:text-left px-6">
                        <h2 className="text-[#D17A0E] uppercase md:text-[24px] text-[16px] font-bold">SHYAMA YOGA STUDIO</h2>
                        <h1 className="md:text-[48px] text-[24px] font-bold mt-2">{aboutData.Heading}</h1>
                        <p className="text-[#361A06] text-[20px] mt-2">{aboutData.Description}</p>
                        <ul className="mt-4 list-disc list-inside space-y-1 text-[#361A06] text-[16px] md:text-[20px]">
                            {aboutData.Points?.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Image Carousel */}
                    <div className="md:w-1/2 flex flex-col items-center relative mt-4 md:mt-0 min-h-[300px] md:min-h-[400px] w-full">
                        <div className="relative w-72 md:w-11/12 h-72 md:h-80 overflow-hidden rounded-lg">
                            {aboutData.PhotoCarousel?.map((img, index) => (
                                <img
                                    key={index}
                                    src={`data:image/jpeg;base64,${img}`} // Handle base64 images
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
        </div>
    );
};

export default About;
