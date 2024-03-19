import { Link, useLocation } from "react-router-dom";
import styles from "./nav.module.scss";
import { useAuth } from "../../context/Auth";
import { Profile } from "../icons/Profile";
import { useState } from "react";
import { Logout } from "../icons/Logout";
import { Hamburger } from "../icons/Hamburger";
import { Exit } from "../icons/Exit";
const Nav = () => {
    const links = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "Orders",
            path: "/orders",
        },
    ];
    const path = useLocation().pathname;
    console.log(path);
    const [open, setOpen] = useState(false);
    const [openNav, setopenNav] = useState(false);
    const { user, logout } = useAuth();
    return (
        <header className="container">
            <div className="py-4 flex items-center justify-between gap-3 mt-6 ">
                <Link to={"/"}>
                    <h3 className="font-bold whitespace-nowrap text-mainColor">
                        <img src="/logo.svg" alt="img-logo" className="w-20" />
                    </h3>
                </Link>
                <div className="sm:block hidden">
                    <ul className="list-none flex gap-12 justify-center font-semibold text-[#332a47]">
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className="hover:text-mainColor/90 transition-all duration-200"
                            >
                                <Link
                                    to={link.path}
                                    className={`${
                                        path === link.path && styles.active
                                    }`}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className=" justify-between items-center gap-4 sm:flex hidden">
                    {!user ? (
                        <Link to={"/login"}>
                            <button className="bg-mainColor font-bold border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor/90 text-white  rounded-full  duration-300   transition-colors p-2 px-5 mt-4 w-full">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <div
                            className="mr-12 cursor-pointer"
                            onClick={() => setOpen(!open)}
                        >
                            <Profile />
                            {open && (
                                <ul className=" absolute -translate-x-2 bg-[#ddd] p-3 z-50 rounded-lg translate-y-2 ">
                                    <li className="mb-3 relative">
                                        {user.attributes.username}
                                    </li>{" "}
                                    <li
                                        className="flex items-center justify-center cursor-pointer"
                                        onClick={logout}
                                    >
                                        <Logout />
                                        <button>Logout</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>{" "}
                {/* /Mobile  */}
                <Hamburger
                    className="sm:hidden block cursor-pointer"
                    onClick={() => setopenNav((prev) => !prev)}
                />
                <div
                    className={`bg-[rgba(18,21,25,0.98)] ${
                        openNav
                            ? "min-h-dvh  visible opacity-100 customNav"
                            : "invisible h-0 opacity-0 closedNav"
                    } fixed z-50 top-0 left-0 w-screen `}
                >
                    <div className=" flex justify-end mt-8">
                        <Exit
                            className={`${
                                openNav ? "" : "hidden"
                            } cursor-pointer mr-2`}
                            onClick={() => setopenNav(false)}
                        />{" "}
                    </div>

                    <div className="">
                        <ul className="flex flex-col font-semibold justify-center items-center mt-12 text-white gap-12">
                            {links.map((link, index) => (
                                <li
                                    key={index}
                                    className="hover:text-mainColor/90 transition-all duration-200"
                                >
                                    <Link
                                        to={link.path}
                                        className={`${
                                            path === link.path && styles.active
                                        }`}
                                        onClick={() => setopenNav(false)}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                            <li className="hover:text-mainColor/90 transition-all duration-200">
                                {user ? (
                                    <button
                                        onClick={logout}
                                        className="bg-mainColor font-bold border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor/90 text-white  rounded-md  duration-300  transition-colors p-2  mt-4 w-full"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        onClick={() => setopenNav(false)}
                                        to={"/login"}
                                        className="bg-mainColor font-bold border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor/90 text-white  rounded-md  duration-300   transition-colors p-2  mt-4 w-full"
                                    >
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Nav;
