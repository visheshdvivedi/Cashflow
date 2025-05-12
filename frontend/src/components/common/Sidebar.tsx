import React from "react";

import { BsBank2 } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { LuArrowRightLeft } from "react-icons/lu";
import { MdDashboard, MdAccountBox } from "react-icons/md";

const Sidebar = () => {

    const links = [
        { href: "/", text: "Dashboard", icon: <MdDashboard size={24} /> },
        { href: "/account", text: "Accounts", icon: <MdAccountBox size={24} /> },
        { href: "/transaction", text: "Transactions", icon: <LuArrowRightLeft size={24} /> },
        { href: "/settings", text: "Settings", icon: <IoMdSettings size={24} /> },
    ]

    return (
        <aside className="py-6 w-[20%] flex flex-col gap-5">
            <h2 className="font-bold text-2xl uppercase px-6 text-center">cashflow</h2>
            <hr className="border border-slate-300" />
            <nav className="text-black px-2 flex flex-col gap-2">
                { links.map(link => (
                    <a className="flex flex-row justify-start items-center gap-4 p-3 rounded-lg hover:bg-slate-200" href={link.href}>
                        {link.icon}
                        <span className="text-md">{link.text}</span>
                    </a>
                )) }
            </nav>
        </aside>
    );
};

export default Sidebar;
