"use client"

import { ccf } from "@/utils/styleFormat";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CLIENT_ROUTES } from "@/routes/routes";
import { usePathname } from "next/navigation";
import HeaderButton from "../buttons/HeaderButton";


type HeaderProps = React.ComponentPropsWithoutRef<"div">;

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(function Header (
    { className, ...props },
    ref
) {

    const [menuOpen, setMenuOpen] = React.useState(false);

    const pathname = usePathname();


    return (
        <div>
            <div
                ref={ref}
                className={ccf("flex m-auto h-32 fixed top-4 left-0 right-0 max-w-[1920px] px-6 z-999", className)}
                {...props}
                >
                
                <Image
                    key={1}
                    src="/c4Logo.svg"
                    alt="VehicleLink"
                    width={235}
                    height={300}
                    className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto mt-3 lg:mt-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                    priority
                />

                <div className="h-[50] lg:h-[100px] w-[65%] rounded-l-full lg:w-[45%] my-2 shadow-[0_-10px_6px_rgba(0,0,0,0.45),0_0_10px_2px_rgba(0,0,0,0.45)]
                bg-linear-to-r from-navBackground/40 via-navBackground/90 to-navBackground backdrop-blur-sm" >

                </div>
                
                {/* Desktop Links */}
                    <HeaderButton href={CLIENT_ROUTES.home} className={(pathname === CLIENT_ROUTES.home)? "text-navTextActive" : "text-navText"}>
                        <span>Home</span>
                    </HeaderButton>

                    <HeaderButton href={CLIENT_ROUTES.vehicles} className={(pathname === CLIENT_ROUTES.vehicles)? "text-navTextActive" : "text-navText"}>
                        <span>Vehicles</span>
                    </HeaderButton>

                    <HeaderButton href={CLIENT_ROUTES.parts} className={(pathname === CLIENT_ROUTES.parts)? "text-navTextActive" : "text-navText"}>
                        <span>Parts</span>
                    </HeaderButton>

                    <HeaderButton href={CLIENT_ROUTES.about} className={(pathname === CLIENT_ROUTES.about)? "text-navTextActive" : "text-navText"}>
                        <span>Info</span>
                    </HeaderButton>
                {/* Desktop Links */}
                {/*     END */}
                
                {/* Mobile Button */}
                {/* Hamburger */}
                    <button
                        type="button"
                        className={`lg:hidden inline-flex items-center justify-center cursor-pointer
                                    h-[50] lg:h-[100px] my-2 mx-4 min-w-[50] lg:min-w-[100px] shadow-[0_-10px_6px_rgba(0,0,0,0.45),0_0_10px_2px_rgba(0,0,0,0.45)] bg-navBackground
                                    `}
                        aria-label="Toggle Menu"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuOpen((v) => !v)}
                        >
                            <span className="sr-only">Toggle menu</span>
                            <div className="relative h-5 w-6">
                                <span
                                    className={`absolute left-0 top-0 h-0.5 w-6 bg-navText transition-[transform-color] duration-200 ease-linear
                                    ${menuOpen ? "translate-y-2 rotate-45 bg-navTextActive" : "" }`}
                                />
                                <span
                                    className={`absolute left-0 top-2 h-0.5 w-6 bg-navText transition-opacity duration-200 
                                    ${menuOpen ? "opacity-0" : "opacity-100"}`}
                                />
                                <span
                                    className={`absolute left-0 top-4 h-0.5 w-6 bg-navText transition-[transform,color] duration-200 ease-initial
                                    ${menuOpen ? "-translate-y-2 -rotate-45 bg-navTextActive" : ""}`}
                                />
                            </div>
                    </button>

                {/* Mobile Links */}
                {menuOpen &&
                    <div id="mobile-menu"
                        className={ccf("lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out")}
                        >
                            <nav className="fixed top-[75px] left-[74%] px-6 pb-6 pt-2 bg-navBackground shadow-[0_-10px_6px_rgba(0,0,0,0.45),0_0_10px_2px_rgba(0,0,0,0.45)]">
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <Link href={CLIENT_ROUTES.home} 
                                            className="block py-2 text-navText hover:text-navTextHover" 
                                            onClick={() => setMenuOpen(false)}
                                            >
                                                Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CLIENT_ROUTES.vehicles} 
                                            className="block py-2 text-navText hover:text-navTextHover" 
                                            onClick={() => setMenuOpen(false)}
                                            >
                                                Vehicles
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CLIENT_ROUTES.parts} 
                                            className="block py-2 text-navText hover:text-navTextHover" 
                                            onClick={() => setMenuOpen(false)}
                                            >
                                                Parts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={CLIENT_ROUTES.about} 
                                            className="block py-2 text-navText hover:text-navTextHover" 
                                            onClick={() => setMenuOpen(false)}
                                            >
                                                Info
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                    </div>
                }
                {/* Mobile Button */}
                {/*     END */}

                <div className="h-[50] lg:h-[100px] lg:rounded-r-full bg-navBackground w-[5%] my-2 shadow-[0_-10px_6px_rgba(0,0,0,0.45),0_0_10px_2px_rgba(0,0,0,0.45)]">
                </div>

                
            </div>
            <div className={ccf("h-[110px] sm:h-[125px] md:h-[150px] lg:h-[175px] xl:h-[235px] fixed top-0 w-full z-990", (pathname === CLIENT_ROUTES.home)? "bg-primaryBackground" : "bg-transparent")}></div>
            <div className="mb-[110px] sm:mb-[125px] md:mb-[150px] lg:mb-[175px] xl:mb-[235px]"></div>
        </div>
    )
});

Header.displayName = "Header";

export default Header