// CustomButton.js
import React from "react";

const CustomButton = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
            {children}
        </button>
    );
};

export default CustomButton;
