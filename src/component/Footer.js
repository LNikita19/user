import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { API_BASE_URL } from "../config";
import axios from "axios";

const Footer = () => {
    const [footerData, setFooterData] = useState({
        location: "",
        contactNumber: "",
        instagramLink: "",
        facebookLink: "",
        youtubeLink: "",
        xLink: "",
        photo: ""
    });

    const getFooterData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getfooterData`);
            const data = response?.data?.data;
            if (data) {
                setFooterData({
                    location: data.Location || "Diamond point Opp to Swastik Vishaka Steel",
                    contactNumber: data.ContactNumber || "85004 09800",
                    instagramLink: data.instagramLink || "#",
                    facebookLink: data.FacebookLink || "#",
                    youtubeLink: data.YouTubeLink || "#",
                    xLink: data.XLink || "#",
                    photo: data.Photo || "/Logo.png"
                });
            }
        } catch (e) {
            console.error("Error fetching footer data:", e);
            // Set default values if API fails
            setFooterData({
                location: "Diamond point Opp to Swastik Vishaka Steel",
                contactNumber: "85004 09800",
                instagramLink: "#",
                facebookLink: "#",
                youtubeLink: "#",
                xLink: "#",
                // photo: "/Logo.png"
            });
        }
    };

    useEffect(() => {
        getFooterData();
    }, []);

    return (
        <footer className="relative text-white text-center py-6 px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${'/Background.png'})` }}>
            <div className="max-w-screen-lg mx-auto flex flex-col items-center md:flex-row md:items-center md:justify-between">
                {/* Left Side - Logo Section */}
                <div className=" flex flex-col items-center mt-8 md:items-start">
                    <img
                        src={footerData.photo || "/Footerlogo.png"}
                        alt="Background"
                        className=" w-64 md:w-[28rem]"
                    />
                    {/* <img
                        src={footerData.photo || "/Logo.png"}
                        alt="Shyama Hatha Yoga"
                        className="w-44 md:w-[12rem] relative z-10"
                    /> */}
                </div>

                {/* Right Side - Contact Info */}
                <div className="text-center md:text-left mt-10 md:mt-0">
                    <h3 className="md:text-[56px] font-bold font-david">Contact Us!</h3>
                    <p className="text-[#FFF9E180] font-normal text-[20px]">Everyday 8:00 - 20:00</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                        <span className="bg-orange-400 p-3 rounded-xl">
                            <MdLocationOn className="text-white text-xl" />
                        </span>
                        <p className="text-[#FFF9E1] font-normal font-jakarta  tex-[16px] md:text-[20px]">{footerData.location}</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                        <span className="bg-orange-400 p-3 rounded-xl">
                            <MdPhone className="text-white text-xl" />
                        </span>
                        <p className="text-[#FFF9E1] font-normal font-jakarta text-[20px]">{footerData.contactNumber}</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-5">
                        <a href={footerData.facebookLink} target="_blank" rel="noopener noreferrer" className="bg-orange-400 p-3 rounded-full cursor-pointer">
                            <FaFacebookF className="text-white text-xl" />
                        </a>
                        <a href={footerData.xLink} target="_blank" rel="noopener noreferrer" className="bg-orange-400 p-3 rounded-full cursor-pointer">
                            <FaTwitter className="text-white text-xl" />
                        </a>
                        <a href={footerData.instagramLink} target="_blank" rel="noopener noreferrer" className="bg-orange-400 p-3  text-white rounded-full cursor-pointer">
                            <FaInstagram className="text-white text-xl" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="mt-6 text-center">
                {/* Horizontal line */}
                <hr className="border-[#FFF9E1] w-full mx-auto mb-4" />

                {/* Text in a row */}
                <div className="flex flex-row justify-between items-center w-full px-4">
                    <p className="text-[#FFF9E1] font-jakarta font-bold text-[14px]">
                        Shyama Yoga Studio
                    </p>
                    <p className="text-[#FFF9E1] font-jakarta font-bold text-[14px]">
                        &copy;2025. All rights reserved.
                    </p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;