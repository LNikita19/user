import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../config";

const Author = () => {
    const [description, setDescription] = useState("");
    const [heading, setHeading] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        getAboutData();
    }, []);

    // Fetch the latest Author Data
    const getAboutData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getauthorData`);
            if (response?.data?.data?.length > 0) {
                const latestData = response.data.data[response.data.data.length - 1]; // Get the latest entry
                setImage(latestData.Photo);
                setHeading(latestData.mainHeading);
                setDescription(latestData.Description);
            }
        } catch (error) {
            console.error("Error fetching Author data:", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-start md:mt-44 mt-16 md:-mb-24 mb-14 items-center space-y-6 md:space-x-52 gap-20 ">
            {/* Left Section - Text */}
            <div className="max-w-xl  ml-0 md:text-left  text-start font-david px-4">
                <p className="text-[#FD8531] font-bold md:text-[24px] uppercase mt-4 text-[20px]">Instructor</p>
                <h1 className="text-[#361A06] font-bold md:text-[48px] text-[32px] leading-[1.1] ">
                    {heading || "Meet Our Talented Instructor"}
                </h1>
                <div className="text-[#361A06] font-normal font-david md:text-[20px] text-[16px] space-y-4 mt-4">
                    <p className="md:pb-6">
                        {description || "Lorem ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."}
                    </p>

                </div>
            </div>

            {/* Right Section - Image */}
            <div className=" flex justify-center items-center w-full md:w-auto">
                <img
                    src={image || "/main.webp"}
                    alt="Round Background"
                    className="absolute w-full md:w-[400px] lg:w-[600px] md:mt-16 mt-8  mb-0 z-0 -opacity-10 "
                />
                {/* <img
                        src="/Person.png"
                        alt="Person"
                        className="relative z-10 w-[150px] sm:w-[250px] md:w-[350px] lg:w-[450px] max-w-full"
                    /> */}
            </div>
        </div>
    );
};

export default Author;
