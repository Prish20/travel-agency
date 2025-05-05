import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const SidebarLogo = () => {
    return (
        <Link
            to="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <img src="/favicon.ico" alt="logo" height={24} width={24} />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                <span className="text-white font-bold">TourDrive</span>
            </motion.span>
        </Link>
    );
};

export const SidebarLogoIcon = () => {
    return (
        <Link
            to="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <img src="/favicon.ico" alt="logo" height={24} width={24} />
        </Link>
    );
};
