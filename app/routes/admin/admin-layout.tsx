import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Sidebar, SidebarBody, SidebarLink, SidebarLogo, SidebarLogoIcon } from "components/sidebar";
import { getAdminSidebarLinks } from "lib/constants/sidebarLinks";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
    };

    const links = getAdminSidebarLinks(handleLogout);

    return (
        <div className="w-screen h-screen overflow-hidden bg-neutral-900">
            <SidebarComponent
                width="100vw"
                height="100vh"
                enableGestures={false}
                className="!rounded-none !border-none !p-0"
            >
                <div className="w-full h-full flex flex-col md:flex-row overflow-hidden bg-neutral-900">
                    <Sidebar open={open} setOpen={setOpen}>
                        <SidebarBody className="justify-between gap-10">
                            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                                {open ? <SidebarLogo /> : <SidebarLogoIcon />}
                                <div className="mt-8 flex flex-col gap-2">
                                    {links.map((link, idx) => (
                                        <SidebarLink key={idx} link={link} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <SidebarLink
                                    link={{
                                        label: "contact@christadriansanya.me",
                                        href: "#",
                                        icon: (
                                            <img
                                                src="https://assets.aceternity.com/manu.png"
                                                className="h-7 w-7 flex-shrink-0 rounded-full"
                                                width={50}
                                                height={50}
                                                alt="Avatar"
                                            />
                                        ),
                                    }}
                                />
                            </div>
                        </SidebarBody>
                    </Sidebar>

                    <main className="flex-1 w-full overflow-auto bg-neutral-900 m-6">
                        <Outlet />
                    </main>
                </div>
            </SidebarComponent>
        </div>
    );
};

export default AdminLayout;
