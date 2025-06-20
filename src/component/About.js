import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const defaultData = {
    Heading: "Clear Mind & Refresh Your Body",
    Description: "Lorem Ipsum is simply dummy text of the printing & typesetting industry.",
    PhotoCarousel: ["/p1.png", "/Image3.png"], // Default images
    // Points: ["Neck Pain", "Peace", "Happiness"],
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
                        // Points: defaultData.Points, // Static for now
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
        <>
            <div className="bg-[#FFF4C0] font-david flex flex-col min-h-screen p-6">
                {/* Outer Spacing and Card */}
                <div className="flex justify-center mt-8 px-4">
                    <div className="border border-[#361A0640] rounded-xl p-6 shadow-lg bg-white w-full max-w-[1200px] flex flex-col md:flex-row items-stretch gap-6">

                        {/* LEFT: Text Section */}
                        <div className="md:w-1/2 w-full lg:px-6 p-0 flex flex-col justify-between">
                            <div>
                                <h2 className="text-[#D17A0E] uppercase md:text-[24px] text-[16px] font-bold">
                                    SHYAMA YOGA STUDIO
                                </h2>
                                <h1 className="md:text-[48px] mt-2 md:mt-4 text-[28px] font-bold leading-[1.0]">
                                    {aboutData.Heading}
                                </h1>
                                <div className="text-[#361A06] font-medium	 font-david md:text-[20px] text-[16px] md:mt-6 mt-4  space-y-4 leading-[1.2]">
                                    {aboutData.Description?.split(/\.\s+/).map((sentence, index, arr) => (
                                        sentence.trim() && (
                                            <p key={index} className={index < arr.length - 1 ? "mb-2 last:mb-0" : ""}>
                                                {sentence.trim()}
                                                {index < arr.length - 1 && "."}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Image Carousel */}
                        <div className="md:w-1/2 w-full flex flex-col justify-between items-center relative">
                            {/* Image */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mt-4 md:mt-0">
                                {aboutData.PhotoCarousel?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`data:image/jpeg;base64,${img}`}
                                        alt="Yoga"
                                        className={`absolute w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-500 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Dots Indicator */}
                            <div className="flex justify-center space-x-2 mt-4">
                                {aboutData.PhotoCarousel?.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentImageIndex === index ? "bg-[#D17A0E]" : "bg-gray-300"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>




                <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 font-david text-[#361A06] mt-10 md:mt-16 mb-10 px-4">
                    {[{
                        icon: "/Icon 1.png",
                        title: "Builds Strength & Alignment",
                        desc: "Strengthens the spine, ligaments, & sinews, enhancing posture, flexibility, stability, & overall musculoskeletal integrity."
                    }, {
                        icon: "/Icon 3.png",
                        title: "Revitalizes the System",
                        desc: "Rejuvenates organs, balances hormones, boosts vitality, improves digestion, & supports healthy, sustainable natural weight management."
                    }, {
                        icon: "/Icon 2.png",
                        title: "Mental Clarity & Emotional Stability",
                        desc: " Sharpens focus, calms stress, nurtures joy, awakens meditativeness, & deepens inner bliss & emotional wellbeing."
                    }].map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center w-full max-w-xs  p-4 ">
                            <img src={item.icon} alt={item.title} className="w-[120px] h-[120px] mb-4" />
                            <h1 className="font-bold text-[24px] md:text-[32px] mt-4 leading-[1] mb-2">{item.title}</h1>
                            <p className="text-[18px] md:text-[20px] font-medium font-david leading-[1.2] mt-2 tracking-wide text-center ">{item.desc}</p>

                        </div>
                    ))}
                </div>

            </div >


        </>

    );
};

export default About;
