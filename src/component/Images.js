import React, { useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../config";

const defaultImages = [
    "/image1.png",
    "/Image2.png",
    "/Image3.png",
    "/Image1.png",
    "/Image2.png",
    "/image3.png"
];

const ImageSlider = () => {
    const [index, setIndex] = useState(0);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/getImageDataData`);
                if (response.data.status && response.data.data.length > 0) {
                    setUploadedImages(response.data.data.map(img => img.Photo));
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const prevSlide = () => {
        setIndex(prev => {
            const imagesToUse = getImagesToDisplay();
            return prev === 0 ? imagesToUse.length - 1 : prev - 1;
        });
    };

    const nextSlide = () => {
        setIndex(prev => {
            const imagesToUse = getImagesToDisplay();
            return prev === imagesToUse.length - 1 ? 0 : prev + 1;
        });
    };

    const getImagesToDisplay = () => {
        return uploadedImages.length > 0 ? uploadedImages : defaultImages;
    };

    if (loading) {
        return <div className="text-center py-8">Loading images...</div>;
    }

    const imagesToDisplay = getImagesToDisplay();
    const adjustedIndex = index % imagesToDisplay.length;

    return (
        <>
            <div className="relative w-full max-w-5xl mx-auto">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.5) -6.27%, rgba(255, 255, 255, 0) 101.28%)' }}
                />
                <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.5) -6.27%, rgba(255, 255, 255, 0) 101.28%)' }}
                />
                {/* Image Container */}
                <div className="flex overflow-hidden justify-start mt-8 ">
                    <div
                        className="flex transition-transform duration-500 ease-in-out gap-4"
                        style={{ transform: `translateX(-${adjustedIndex * 50}%)` }}
                    >
                        {imagesToDisplay.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`Slide ${i + 1}`}
                                className="w-1/3 gap-8 object-cover rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                                onError={(e) => {
                                    if (uploadedImages.includes(src)) {
                                        e.target.src = defaultImages[i % defaultImages.length];
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Circular Navigation Buttons */}
                <div className="flex justify-center items-center gap-4 mt-6 mb-12">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 flex items-center justify-center bg-[#361A06] text-white rounded-full hover:bg-[#4A2810] transition-all duration-300 shadow-lg"
                        aria-label="Previous slide"
                    >
                        <FaCaretLeft className="text-white text-3xl" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 flex items-center justify-center bg-[#361A06] text-white rounded-full hover:bg-[#4A2810] transition-all duration-300 shadow-lg"
                        aria-label="Next slide"
                    >
                        <FaCaretRight className="text-white text-3xl" />
                    </button>

                </div>
            </div>
        </>

    );
};

export default ImageSlider;





// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// const defaultImages = [
//     "/image1.png",
//     "/Image2.png",
//     "/Image3.png",
//     "/Image1.png",
//     "/Image2.png",
//     "/image3.png"
// ];

// const ImageSlider = () => {
//     const [index, setIndex] = useState(0);
//     const [uploadedImages, setUploadedImages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const sliderRef = useRef(null);
//     const intervalTime = 3000; // Time in milliseconds for auto scroll
//     const scrollAmount = 0.5; // Percentage of the container width to scroll at a time

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/getImageDataData`);
//                 if (response.data.status && response.data.data.length > 0) {
//                     setUploadedImages(response.data.data.map(img => img.Photo));
//                 }
//             } catch (error) {
//                 console.error("Error fetching images:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchImages();
//     }, []);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             if (sliderRef.current) {
//                 const containerWidth = sliderRef.current.offsetWidth;
//                 sliderRef.current.scrollLeft += containerWidth * scrollAmount;

//                 // Check if we've reached the end and need to loop
//                 const scrollLeft = sliderRef.current.scrollLeft;
//                 const scrollWidth = sliderRef.current.scrollWidth;
//                 const threshold = scrollWidth - containerWidth - 1; // Small buffer

//                 if (scrollLeft > threshold) {
//                     sliderRef.current.scrollLeft = 0;
//                 }
//             }
//         }, intervalTime);

//         return () => clearInterval(intervalId); // Cleanup on unmount
//     }, [uploadedImages, loading]);

//     const getImagesToDisplay = () => {
//         return uploadedImages.length > 0 ? [...uploadedImages, ...uploadedImages] : [...defaultImages, ...defaultImages];
//     };

//     if (loading) {
//         return <div className="text-center py-8">Loading images...</div>;
//     }

//     const imagesToDisplay = getImagesToDisplay();

//     return (
//         <div className="relative w-full max-w-5xl mx-auto">
//             {/* Gradient Overlays */}
//             <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
//                 style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.5) -6.27%, rgba(255, 255, 255, 0) 101.28%)' }}
//             />
//             <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
//                 style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.5) -6.27%, rgba(255, 255, 255, 0) 101.28%)' }}
//             />
//             {/* Image Container */}
//             <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth">
//                 <div className="flex transition-transform duration-500 ease-in-out gap-4">
//                     {imagesToDisplay.map((src, i) => (
//                         <img
//                             key={i}
//                             src={src}
//                             alt={`Slide ${i + 1}`}
//                             className="w-1/2 sm:w-[calc(50%-16px)] md:w-[calc(50%-16px)] lg:w-[calc(50%-16px)] xl:w-[calc(50%-16px)] object-cover rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 min-w-[calc(50%-16px)]"
//                             onError={(e) => {
//                                 if (uploadedImages.includes(src.split('/').pop())) { // Check filename for uploaded images
//                                     e.target.src = defaultImages[i % defaultImages.length];
//                                 }
//                             }}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ImageSlider;