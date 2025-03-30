// import React, { useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import PopupProgram from "./program/PopupProgram";

// const programsData = [
//     {
//         id: 1,
//         date: "12 Dec 2024",
//         title: "Surya Kriya",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//     },
//     {
//         id: 2,
//         date: "17 Dec 2024",
//         title: "Angamardana",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//     },
//     {
//         id: 3,
//         date: "23 Dec 2024",
//         title: "Yogasanas & Surya Kriya",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//         badge: "Combo", // Combo Program
//     },
//     {
//         id: 4,
//         date: "27 Dec 2024",
//         title: "Surya Kriya (Telugu)",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//     },
// ];

// const Programs = () => {
//     const [selectedProgram, setSelectedProgram] = useState(null);

//     return (
//         <div className="px-6 py-10 bg-[#FFFBEF]">
//             {/* Header Section */}
//             <div className="text-center">
//                 <p className="text-[#FD8531] font-bold uppercase">Our Classes</p>
//                 <h1 className="text-[#361A06] text-3xl font-bold mt-2">
//                     Discover & Register <br /> For Our Classes
//                 </h1>
//             </div>

//             {/* Program Cards */}
//             <div className="flex justify-center mt-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {programsData.map((program) => (
//                         <div
//                             key={program.id}
//                             className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-80"
//                         >
//                             {/* Button at the Start */}


//                             {/* Program Image */}
//                             <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />

//                             {/* Date Badge */}
//                             <div className="absolute top-3 left-3 bg-[#FDF7C4] text-[#361A06] text-sm px-3 py-1 rounded-full">
//                                 {program.date}
//                             </div>

//                             {/* Combo Badge */}
//                             {program.badge && (
//                                 <div className="absolute top-3 right-3 bg-[#FD8531] text-white text-sm px-3 py-1 rounded-full">
//                                     {program.badge}
//                                 </div>
//                             )}

//                             {/* Program Details */}
//                             <div className="p-4 flex-1">
//                                 <h2 className="text-[#361A06] font-bold text-xl">{program.title}</h2>
//                                 <p className="text-[#361A06] mt-2">{program.description}</p>
//                             </div>
//                             <div className="p-4 text-left">
//                                 <button
//                                     className="bg-[#361A06] text-white py-2 px-4 rounded-full flex items-center gap-2"
//                                     onClick={() => setSelectedProgram(program)} // ✅ Fix: Set selected program
//                                 >
//                                     Know More
//                                     <img src="/Vector.png" alt="Arrow Icon" className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="flex justify-center mt-8 space-x-3">
//                 <button className="p-2 rounded-full bg-[#FDF7C4] text-[#361A06]">
//                     <FaChevronLeft />
//                 </button>
//                 <button className="p-2 rounded-full bg-[#FDF7C4] text-[#361A06]">
//                     <FaChevronRight />
//                 </button>
//             </div>
//             {/* Popup Program - Conditionally Rendered */}
//             {selectedProgram && <PopupProgram onClose={() => setSelectedProgram(null)} program={selectedProgram} />}
//         </div>
//     );
// };

// export default Programs;
import React, { useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import PopupProgram from "./program/PopupProgram";
import Combopopup from "./program/Combopopup";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [comboPrograms, setComboPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isCombo, setIsCombo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [existingPrograms, setExistingPrograms] = useState([]);

    useEffect(() => {
        const fetchAllPrograms = async () => {
            setIsLoading(true);
            try {
                const [regularResponse, comboResponse, existingResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/getprogramData`),
                    axios.get(`${API_BASE_URL}/getComboPrograms`),
                    axios.get(`${API_BASE_URL}/getExistingPrograms`) // ✅ Fetch Existing Programs
                ]);

                setPrograms(regularResponse.data.data || []);
                setComboPrograms(comboResponse.data.data || []);
                setExistingPrograms(existingResponse.data.data || []); // ✅ Store existing programs

            } catch (error) {
                console.error("Error fetching programs:", error);
            } finally {
                setIsLoading(false);
            }
        };


        fetchAllPrograms();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleKnowMoreClick = (program, isComboProgram = false) => {
        setIsCombo(isComboProgram);
        setSelectedProgram(program);
    };

    // Combine both program types for display
    const allPrograms = [
        ...programs.map(p => ({ ...p, type: 'regular' })),
        ...comboPrograms.map(p => ({ ...p, type: 'combo' })),
        ...existingPrograms.map(p => ({ ...p, type: 'existing' })) // ✅ Include existing programs
    ];
    const scrollCards = (scrollOffset) => {
        const container = document.querySelector('.overflow-x-auto');
        if (container) {
            container.scrollBy({
                left: scrollOffset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div id="Programs" className="px-6 py-10 bg-[#FFFBEF]">
            {/* Header Section */}
            <div className="text-center font-david">
                <p className="text-[#FD8531] font-david md:text-[24px] text-[16px] font-bold uppercase">Our Classes</p>
                <h1 className="text-[#361A06] md:text-[64px] text-[32px] font-bold mt-2">
                    Discover & Register <br /> For Our Classes
                </h1>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-10">
                    <p className="text-gray-500">Loading programs...</p>
                </div>
            )}

            {/* Program Cards */}
            {!isLoading && (
                <>
                    <div className="flex justify-center mt-8 font-jakarta relative">
                        {/* Wavy Background */}
                        <div className="absolute inset-0 z-80 overflow-hidden">
                            <img
                                src="Wavy.webp"
                                alt="Decorative background"
                                className="w-full h-full object-cover opacity-10"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                            {allPrograms.map((program) => (
                                <div
                                    key={program._id}
                                    className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-96 md:w-[500px]"
                                >
                                    {/* Program Image */}
                                    <img
                                        src={program.Photo || "/image1.png"}
                                        alt={program.selectProgram || program.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = "/image1.png";
                                        }}
                                    />

                                    {/* Date Badge */}
                                    <div className="absolute font-bold top-3 left-3 bg-[#FDF7C4] text-[#361A06] text-sm px-3 py-1 rounded-full">
                                        {formatDate(program.startDate)}- {formatDate(program.endDate)}
                                    </div>


                                    {/* Combo Badge */}
                                    {program.badge && (
                                        <div className="absolute top-3 right-3 bg-[#FD8531] text-white text-sm px-3 py-1 rounded-full">
                                            {program.badge}
                                        </div>
                                    )}

                                    {/* Program Details */}
                                    <div className="px-6 py-2 flex-1 font-jakarta">
                                        <h2 className="text-[#361A06] font-extrabold text-[20px] md:text-[40px]">
                                            {program.selectProgram || program.title}
                                        </h2>
                                        <p className="text-[#361A06] font-semibold text-[12px] md:text-[18px] mt-2">
                                            {program.Description || program.description}
                                        </p>
                                    </div>

                                    <div className="p-4 text-left">
                                        <button
                                            className="bg-[#361A06] text-white py-2 px-4 font-jakarta rounded-full flex items-center text-[12px] font-semibold md:text-[20px] gap-2"
                                            onClick={() => handleKnowMoreClick(program, program.type === 'combo')}
                                        >
                                            Know More
                                            <img src="/Vector.png" alt="Arrow Icon" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center mt-8 space-x-3">
                        <button className="p-2 rounded-full bg-[#361A06] text-[#FDF7C4] w-12 h-12 flex items-center justify-center">
                            <FaCaretLeft size={32} />
                        </button>
                        <button className="p-2 rounded-full bg-[#361A06] text-[#FDF7C4] w-12 h-12 flex items-center justify-center">
                            <FaCaretRight size={32} />
                        </button>
                    </div>
                </>
            )}

            {/* Render appropriate popup */}
            {selectedProgram && isCombo ? (
                <Combopopup onClose={() => setSelectedProgram(null)} program={selectedProgram} />
            ) : selectedProgram ? (
                <PopupProgram onClose={() => setSelectedProgram(null)} program={selectedProgram} />
            ) : null}
        </div>
    );
};

export default Programs;