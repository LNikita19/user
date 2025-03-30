import React from "react";

const ContactPopup1 = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                <button className="absolute top-4 right-4 text-[#361A06]" onClick={onClose}>✖</button>
                <h2 className="text-center font-bold text-[#FD8531] text-lg">SHYAMA YOGA STUDIO</h2>
                <h3 className="text-center font-bold text-xl mt-2">Contact Us</h3>
                <p className="text-center text-sm text-[#361A06] mt-2">
                    For severe health concerns, consult and follow your doctor’s advice. For participation inquiries, contact us.                </p>
                <div className="mt-4">
                    <p><b>📞  Helpline : </b>  +91 8150409001 / +91 9951400096</p>
                    <p><b>📧   Email : </b>  support@shyama-yoga.com</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPopup1;
