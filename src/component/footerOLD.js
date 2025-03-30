import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
    const [location, setLocation] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [facebookLink, setFacebookLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [xLink, setXLink] = useState("");
    const [activeSlideId, setActiveSlideId] = useState(null);
    const [image, setImage] = useState(null);

    const getFooterData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getfooterData`);
            const data = response?.data?.data;
            if (data) {
                setImage(data.Photo); // Set the image object
                setLocation(data.Location);
                setContactNumber(data.ContactNumber);
                setInstagramLink(data.instagramLink);
                setFacebookLink(data.FacebookLink);
                setYoutubeLink(data.YouTubeLink);
                setXLink(data.XLink);
                setActiveSlideId(data.id);
            }
        } catch (e) {
            console.error("Error fetching footer data:", e);
        }
    };

    useEffect(() => {
        getFooterData();
    }, []);

    return (
        <footer className="relative text-white text-center py-6 px-4 bg-cover bg-center" style={{ backgroundImage: "url('/Background.png')" }}>
            <div className="max-w-screen-lg mx-auto flex flex-col items-center md:flex-row md:items-center md:justify-between">
                {/* Left Side - Logo with Circular Background */}
                <div className="relative flex flex-col items-center md:items-start">
                    {/* Enlarged round PNG and centered it */}
                    <img
                        src={image?.backgroundImage || "/rounds.png"} // Use the image from the API or fallback to default
                        alt="Background"
                        className="absolute w-64 md:w-[28rem] -top-16 md:-top-24"
                    />

                    {/* Logo remains in front of the round PNG */}
                    <img
                        src={image?.logo || "/Logo.png"} // Use the logo from the API or fallback to default
                        alt="Shyama Hatha Yoga"
                        className="w-44 md:w-52 relative z-10"
                    />
                </div>

                {/* Right Side - Contact Info */}
                <div className="text-center md:text-left mt-10 md:mt-0">
                    <h3 className="md:text-[56px] font-bold font-david">Contact Us!</h3>
                    <p className="text-[#FFF9E180] font-normal text-[20px]">Everyday 8:00 - 20:00</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                        <span className="bg-orange-400 p-3 rounded-xl">
                            <MdLocationOn className="text-white text-xl" />
                        </span>
                        <p className="text-[#FFF9E1] font-normal font-jakarta text-[20px]">{location}</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                        <span className="bg-orange-400 p-3 rounded-xl">
                            <MdPhone className="text-white text-xl" />
                        </span>
                        <p className="text-[#FFF9E1] font-normal font-jakarta text-[20px]">{contactNumber}</p>
                    </div>
                    {/* Social Icons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-5">
                        <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="bg-orange-400 p-3 rounded-full cursor-pointer">
                            <FaFacebookF className="text-white text-xl" />
                        </a>
                        <a href={xLink} target="_blank" rel="noopener noreferrer" className="bg-orange-400 p-3 rounded-full cursor-pointer">
                            <FaTwitter className="text-white text-xl" />
                        </a>
                        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="bg-orange-400 p-3  text-white rounded-full cursor-pointer">
                            <FaInstagram className="text-white text-xl" />
                        </a>
                    </div>
                </div>
            </div>
            {/* Footer Bottom Section */}
            <div className="mt-6 text-center">
                {/* Horizontal line */}
                <hr className="border-[#FFF9E1] w-full mx-auto mb-4" />
                <div className="flex flex-row justify-between">

                    <p className="text-[#FFF9E1] font-jakarta font-bold text-[14px]">Shyama Yoga Studio</p>
                    <p className="text-[#FFF9E1] font-jakarta font-bold text-[14px]">&copy;2025. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;