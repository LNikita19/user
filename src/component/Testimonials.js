import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const staticTestimonials = [
    {
        _id: "1",
        Name: "Esther Howard",
        profession: "Product Manager, Circle",
        Photo: "/Profile.png",
        comment: "We use Polo on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
    },
    {
        _id: "2",
        Name: "Courtney Henry",
        profession: "Product Manager, Circle",
        Photo: "/Profile.png",
        comment: "As an early stage startup I’m really loving using Polo – great balance of flexibility and prescriptiveness.",
    },
    {
        _id: "3",
        Name: "Cody Fisher",
        profession: "Product Manager, Circle",
        Photo: "/Profile.png",
        comment: "We use Polo on a daily basis for several internal processes, and I cannot rave enough about them.",
    },
    {
        _id: "4",
        Name: "Devon Lane",
        profession: "Product Manager, Circle",
        Photo: "/Profile.png",
        comment: "Most CRMs are overcomplicated and expensive. Polo is rock-solid, has AAA customer support, and is *very* flexible and simple.",
    }
];

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        getTestimonialData();
    }, []);

    const getTestimonialData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/gettestimonialdata`);
            if (response.data.status && response.data.data.length > 0) {
                setTestimonials(response.data.data);
            } else {
                setTestimonials(staticTestimonials); // Fallback to static data
            }
        } catch (error) {
            console.error("Error fetching testimonial data:", error);
            setTestimonials(staticTestimonials); // Fallback in case of error
        }
    };

    return (
        <section className="py-12 px-4">
            {/* Header */}
            <div className="text-center font-david">
                <p className="text-[#FD8531] text-[20px] md:text-[24px] font-bold">TESTIMONIALS</p>
                <h1 className="text-[#361A06] md:text-[64px] text-[32px] font-bold">
                    What Our Clients  <br />  Say About Us
                </h1>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-jakarta gap-6 max-w-screen-lg mx-auto">
                {/* {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial._id}
                        className={`p-6 rounded-xl shadow-md bg-[#FDF7C4] 
                        ${index % 5 === 0 ? 'col-span-2' : 'col-span-1'} 
                        ${index % 7 === 0 ? 'row-span-2' : ''}`}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={testimonial.Photo || "/Profile.png"}
                                alt={testimonial.Name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{testimonial.Name}</h3>
                                <p className="text-sm text-[#361A06] font-semibold">{testimonial.profession}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm">{testimonial.comment}</p>
                    </div>
                ))} */}

                {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className={`p-6 rounded-xl bg-[#FDF7C4] shadow-md ${testimonial.bgColor}`}>

                        <div className="flex items-center font-jakarta gap-4">
                            <img
                                src={testimonial.Photo || "/Profile.png"}
                                alt={testimonial.Name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-[18px] text-[#361A06] font-semibold">{testimonial.Name}</h3>
                                <p className="text-[16px] font-normal  text-[#6B7280] f">{testimonial.profession}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-[#361A06] text-[16px]">{testimonial.comment}</p>
                    </div>
                ))}
            </div>

            {/* Blur Effect at the Bottom */}
            {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div> */}
        </section >
    );
};

export default Testimonials;


