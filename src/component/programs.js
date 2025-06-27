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
import PopupProgram from "./program/PopupProgram";
import Combopopup from "./program/Combopopup";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [comboPrograms, setComboPrograms] = useState([]);
    const [selectedProgramDetails, setSelectedProgramDetails] = useState(null);
    const [isCombo, setIsCombo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("");
    const [allPrograms, setAllPrograms] = useState([]);
    const [showProgramDropdown, setShowProgramDropdown] = useState(false);
    const [selectedDropdownProgramId, setSelectedDropdownProgramId] = useState(null);
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [availableMonths, setAvailableMonths] = useState([]);
    const [availableLanguages, setAvailableLanguages] = useState([]);

    useEffect(() => {
        const fetchAllPrograms = async () => {
            setIsLoading(true);
            try {
                const [regularResponse, comboResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/getprogramData`),
                    axios.get(`${API_BASE_URL}/getComboPrograms`),
                ]);

                setPrograms(regularResponse.data.data || []);
                setComboPrograms(comboResponse.data.data || []);
                const combined = [
                    ...(regularResponse.data.data || []).map(p => ({ ...p, type: 'regular' })),
                    ...(comboResponse.data.data || []).map(p => ({ ...p, type: 'combo' })),
                ];
                setAllPrograms(combined);

                // Extract available months and languages
                const months = [...new Set(combined.map(p => {
                    if (p.startDate) {
                        return new Date(p.startDate).toLocaleString('default', { month: 'long' });
                    }
                    return null;
                }).filter(Boolean))];
                setAvailableMonths(months);

                const languages = [...new Set(combined.map(p => p.selectLanguage).filter(Boolean))];
                setAvailableLanguages(languages);

            } catch (error) {
                console.error("Error fetching programs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPrograms();
    }, []);

    useEffect(() => {
        let filtered = [...allPrograms];

        if (sortBy === "program" && selectedDropdownProgramId) {
            filtered = allPrograms.filter(p => p._id === selectedDropdownProgramId);
            const selectedProgram = allPrograms.find(p => p._id === selectedDropdownProgramId);
            if (selectedProgram?.startDate) {
                setSelectedMonth(new Date(selectedProgram.startDate).toLocaleString('default', { month: 'long' }));
            } else {
                setSelectedMonth("");
            }
            setSelectedLanguage(selectedProgram?.selectLanguage || "");
        } else if (sortBy === "month" && selectedMonth) {
            filtered = allPrograms.filter(p => {
                if (p.startDate) {
                    return new Date(p.startDate).toLocaleString('default', { month: 'long' }) === selectedMonth;
                }
                return false;
            });
        } else if (sortBy === "language" && selectedLanguage) {
            filtered = allPrograms.filter(p => p.selectLanguage === selectedLanguage);
        } else if (!sortBy) {
            filtered = [...allPrograms];
        }

        setFilteredPrograms(filtered);
    }, [sortBy, selectedDropdownProgramId, selectedMonth, selectedLanguage, allPrograms]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleProgramClick = (program) => {
        setSelectedProgramDetails(program);
        setIsCombo(program.type === 'combo');
    };

    const handleSortBy = (type) => {
        setSortBy(type);
        setSelectedProgramDetails(null);
        setSelectedDropdownProgramId(null);
        setShowProgramDropdown(false);
        setShowMonthDropdown(false);
        setSelectedMonth("");
        setShowLanguageDropdown(false);
        setSelectedLanguage("");
    };

    const toggleProgramDropdown = () => {
        setShowProgramDropdown(!showProgramDropdown);
        setSortBy("program");
    };

    const selectDropdownProgram = (programId) => {
        setSelectedDropdownProgramId(programId);
        setShowProgramDropdown(false); // Close dropdown after selection
        setSortBy("program");
    };

    const toggleMonthDropdown = () => {
        setShowMonthDropdown(!showMonthDropdown);
        setSortBy("month");
    };

    const selectDropdownMonth = (month) => {
        setSelectedMonth(month);
        setShowMonthDropdown(false); // Close dropdown after selection
        setSortBy("month");
    };

    const toggleLanguageDropdown = () => {
        setShowLanguageDropdown(!showLanguageDropdown);
        setSortBy("language");
    };

    const selectDropdownLanguage = (language) => {
        setSelectedLanguage(language);
        setShowLanguageDropdown(false); // Close dropdown after selection
        setSortBy("language");
    };

    const displayedPrograms = filteredPrograms.slice(0, 4);

    return (
        <div id="Programs" className="px-6 py-10 bg-[#FFFBEF]">
            {/* Header Section */}
            <div className="text-center font-david">
                <p className="text-[#FD8531] font-david md:text-[24px] mt-4 lg:mt-6 text-[16px] font-bold uppercase">In-Person Studio Programs</p>
                <h1 className='text-[#361A06] md:text-[64px] md:mt-4 mt-2 text-[28px] font-david font-bold text-center mb-6 leading-[1]'>

                    <span>Step Into Our Tranquil Studio</span><br />
                    <span>for Immersive Sessions.</span>
                </h1>
            </div>
            <div className="flex flex-col gap-2 mb-8 max-w-[68rem] mx-auto px-4 relative">
                <h1 className="text-[#361A06] font-david text-[20px] md:text-[24px]">Filter by:</h1>

                <div className="flex flex-wrap gap-2">
                    <div className="relative">
                        <button
                            className={`flex items-center justify-between px-4 py-2 text-[16px] md:text-[18px] rounded-md bg-[#FDF7C4] transition-all duration-200 ${sortBy === "program" ? "bg-[#FD8531] text-[#361A06]" : "text-[#361A06] font-bold"
                                }`}
                            onClick={toggleProgramDropdown}
                        >
                            Program
                            <img className="h-4 w-4 ml-2" src="/Vector.svg" alt="Arrow Icon" />
                        </button>
                        {showProgramDropdown && (
                            <div className="absolute top-full left-0 bg-white shadow-md rounded-md z-10 w-48">
                                {allPrograms.map(program => (
                                    <button
                                        key={program._id}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={() => selectDropdownProgram(program._id)}
                                    >
                                        {program.selectProgram || program.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className={`flex items-center justify-between px-4 py-2 text-[16px] md:text-[18px] rounded-md bg-[#FDF7C4] transition-all duration-200 ${sortBy === "month" ? "bg-[#FD8531] text-[#361A06]" : "text-[#361A06] font-bold"
                                }`}
                            onClick={toggleMonthDropdown}
                        >
                            Month
                            <img className="h-4 w-4 ml-2" src="/Vector.svg" alt="Arrow Icon" />
                        </button>
                        {showMonthDropdown && (
                            <div className="absolute top-full left-0 bg-white shadow-md rounded-md z-10 w-32">
                                {availableMonths.map(month => (
                                    <button
                                        key={month}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={() => selectDropdownMonth(month)}
                                    >
                                        {month}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className={`flex items-center justify-between px-4 py-2 text-[16px] md:text-[18px] rounded-md bg-[#FDF7C4] transition-all duration-200 ${sortBy === "language" ? "bg-[#FD8531] text-[#361A06]" : "text-[#361A06] font-bold"
                                }`}
                            onClick={toggleLanguageDropdown}
                        >
                            Language
                            <img className="h-4 w-4 ml-2" src="/Vector.svg" alt="Arrow Icon" />
                        </button>
                        {showLanguageDropdown && (
                            <div className="absolute top-full left-0 bg-white shadow-md rounded-md z-10 w-32">
                                {availableLanguages.map(language => (
                                    <button
                                        key={language}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={() => selectDropdownLanguage(language)}
                                    >
                                        {language}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-10">
                    {/* <p className="text-gray-500">Loading programs...</p> */}
                </div>
            )}

            {!isLoading && (
                <>
                    <div className="flex justify-center mt-8 font-jakarta relative">
                        {/* Wavy Background */}
                        <div className="absolute inset-0 z-80 overflow-hidden">
                            <img
                                src="Wavy.webp"
                                alt="Decorative background"
                                className="w-full h-full object-cover opacity-20"
                            />
                        </div>
                        <div className="grid grid-cols-1 font-jakarta md:grid-cols-2 gap-14">
                            {displayedPrograms.map((program) => (
                                <div
                                    key={program._id}
                                    className="relative w-full md:w-[500px] rounded-[20px] overflow-hidden shadow-[0px_12px_24px_0px_rgba(54,26,6,0.25)] cursor-pointer"
                                    onClick={() => handleProgramClick(program)}
                                >
                                    {/* Program Image */}
                                    <img
                                        src={program.Photo || "/image1.png"}
                                        alt={program.selectProgram || program.title}
                                        className="w-full h-[300px] object-cover"
                                        onError={(e) => {
                                            e.target.src = "/image1.png";
                                        }}
                                    />

                                    {/* Linear Gradient Blur Overlay at Bottom */}
                                    <div
                                        className="absolute bottom-0 left-0 w-full md:h-[95%] h-[85%]"
                                        style={{
                                            background:
                                                "linear-gradient(0deg, rgba(255, 231, 133, 0.85) 41.5%, rgba(255, 255, 255, 0.05) 65.5%)",
                                        }}
                                    ></div>

                                    {/* Date Badge */}
                                    <div className="absolute font-bold top-3 left-3 bg-[#FDF7C4] text-[#361A06] text-sm px-3 py-1 rounded-full">
                                        {formatDate(program.startDate)}- {formatDate(program.endDate)}
                                    </div>
                                    {program.type === 'combo' && (
                                        <div className="absolute top-3 right-3 bg-[#FDF7C4]  font-bold font-jakarta text-[#361A06] text-sm px-3 py-1 rounded-full">
                                            Combo
                                        </div>
                                    )}
                                    {/* Text & Button Over Gradient */}
                                    <div className="absolute bottom-4 left-4 right-4 text-[#361A06] z-10 font-jakarta">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="font-bold text-[24px] text-[#361A06] leading-tight">
                                                {program.selectProgram || program.title}
                                            </h2>
                                            <p className="text-[14px] leading-1 font-semibold line-clamp-3">
                                                {program.Description || program.description}
                                            </p>
                                        </div>
                                        <div className="bg-[#361A06] text-white py-2 px-4 rounded-full mt-4 flex items-center justify-center text-[14px] font-semibold gap-2">
                                            Know More
                                            <img src="/Vector.png" alt="Arrow Icon" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {filteredPrograms.length > 4 && (
                        <div className="flex justify-center mt-6">
                            <button className="bg-[#FD8531] text-white py-2 px-6 rounded-md font-bold text-lg" onClick={() => { /* Implement load more logic if needed */ }}>
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Render appropriate popup */}
            {selectedProgramDetails && isCombo ? (
                <Combopopup onClose={() => setSelectedProgramDetails(null)} program={selectedProgramDetails} />
            ) : selectedProgramDetails ? (
                <PopupProgram onClose={() => setSelectedProgramDetails(null)} program={selectedProgramDetails} />
            ) : null}
        </div>
    );
};

export default Programs;