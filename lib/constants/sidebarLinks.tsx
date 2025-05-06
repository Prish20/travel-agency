import {
    LayoutDashboard,
    LogOut,
    UsersRoundIcon,
    BusFront,
} from "lucide-react";
import React from "react";

export const getAdminSidebarLinks = (handleLogout: () => void) => [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        label: "All Users",
        href: "/all-users",
        icon: <UsersRoundIcon className="h-5 w-5" />,
    },
    {
        label: "AI Trips",
        href: "/trips",
        icon: <BusFront className="h-5 w-5" />,
    },
    {
        label: "Logout",
        href: "#",
        onClick: handleLogout,
        icon: <LogOut className="h-5 w-5" />,
    },
];
