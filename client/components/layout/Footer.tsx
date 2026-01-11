import { ccf } from "@/utils/styleFormat";
import * as React from "react";
import Image from "next/image";
import { CLIENT_ROUTES } from "@/routes/routes";
import Link from "next/link";
import { BUSINESS_ADDRESS, CONTACT_INFO } from "@/constants/info.constants";


type FooterProps = React.ComponentPropsWithoutRef<"div">;

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(function Footer(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={ccf("items-center text-center w-full md:flex md:justify-around py-5 md:rounded-full max-w-[1920px] md:w-[90%] md:mx-auto", className)}
            {...props}
        >
            <div className="md:text-left md:ml-10">
                <p>{BUSINESS_ADDRESS.address}</p>
                <p className="mb-2">{BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.stateAcronym} {BUSINESS_ADDRESS.zip}</p>
                <p className="mb-2">{CONTACT_INFO.phone}</p>
                <p>{CONTACT_INFO.email}</p>
            </div>


            <Image
                src="/c4LogoFooter.svg"
                alt="VehicleLink"
                width={235}
                height={300}
                className="hidden md:block h-28 md:h-32 lg:h-36 w-auto text-footerLogo"
                priority
            />

            <div className="text-center md:mr-10">
                <hr className="md:hidden text-footerText/25 my-1 max-w-3xs mx-auto"/><h3>C-4 Wrecking LLC </h3><hr className="text-footerText/25 my-1 max-w-3xs mx-auto"/>
                <Link href={CLIENT_ROUTES.vehicles}><p className="hover:text-footerText/25">Vehicle Look-Up</p></Link>
                <Link href={CLIENT_ROUTES.parts}><p className="hover:text-footerText/25">Part Pricing</p></Link>
                <Link href={CLIENT_ROUTES.about}><p className="hover:text-footerText/25">Info</p></Link>
                <Link href={CLIENT_ROUTES.yard}><p className="hover:text-footerText/25">Yard Map</p></Link>
                <Link href={CLIENT_ROUTES.map}><p className="hover:text-footerText/25">Find Us on Google Maps!</p></Link>
            </div>

        </div>
    )
});

Footer.displayName = "Footer";

export default Footer