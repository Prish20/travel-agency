"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "lib/utils";
import { ArrowLeftFromLine, Menu, X } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import type { LinkProps } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

interface Links {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
    onClick?: () => void;
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);
    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...(props as React.ComponentProps<"div">)} />
        </>
    );
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <motion.div
            className={cn(
                "h-full px-4 py-4 hidden md:flex md:flex-col flex-shrink-0",
                className
            )}
            animate={{
                width: animate ? (open ? "250px" : "60px") : "300px",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const MobileSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) => {
    const { open, setOpen } = useSidebar();
    return (
        <>
            <div
                className={cn(
                    "h-10 px-4 py-4 flex flex-row md:hidden items-center w-full"
                )}
                {...props}
            >
                <div className="flex justify-start z-20 w-full">
                    <Menu
                        className="text-neutral-800 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={cn(
                                "fixed h-full w-full inset-0 bg-white p-10 z-[100] flex flex-col justify-between",
                                className
                            )}
                        >
                            <div
                                className="absolute right-10 top-10 z-50 text-black cursor-pointer"
                                onClick={() => setOpen(!open)}
                            >
                                <ArrowLeftFromLine />
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export const SidebarLink = ({
    link,
    text,
    className,
    ...props
}: {
    link: Links;
    text?: string;
    className?: string;
    props?: LinkProps;
}) => {
    const { open, animate } = useSidebar();
    const location = useLocation();
    const isActive = location.pathname === link.href;

    return (
        <Link
            to={link.href}
            onClick={(e) => {
                if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                }
            }}
            className={cn(
                "flex items-center justify-start gap-4 group/sidebar py-2",
                isActive && "text-[#256FF1] font-semibold",
                className
            )}
            {...props}
        >
            {link.icon}
            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-gray dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
                <article className="flex flex-col">
                    <span className="text-sm font-medium text-black">
                        {link.label}
                    </span>
                    <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                        {text}
                    </span>
                </article>
            </motion.span>
        </Link>
    );
};
