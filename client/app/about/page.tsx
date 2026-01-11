"use client"

import InfoPanel from "@/components/containers/InfoPanel"
import { AVAILABLE_HOURS, BUSINESS_ADDRESS, CONTACT_INFO } from "@/constants/info.constants"
import { IMAGE_ROUTES } from "@/routes/routes"
import Image from "next/image"

export default function About() {

    return(
        <main className="p-2 mx-auto md:max-w-[1800px]">

            <InfoPanel className="p-4 mx-auto bg-textboxBackground text-textHeading w-fit">
                <h1>About us!</h1>
            </InfoPanel>

            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 max-w-96 md:max-w-4xl">
                <InfoPanel className="text-center grid place-items-center bg-textboxBackground text-textHeading">
                    <div className="m-4">
                        <h3>{BUSINESS_ADDRESS.address}</h3>
                        <h3>{BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.stateAcronym} {BUSINESS_ADDRESS.zip}</h3>
                        <h3 className="mt-4">{CONTACT_INFO.phone}</h3>
                        <h3>{CONTACT_INFO.email}</h3>
                    </div>
                </InfoPanel>

                <InfoPanel className="p-4 bg-textboxBackground text-textHeading text-[1.17em] font-bold">
                    <div className="mx-auto w-fit">
                        <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-2">
                            <span className="text-left">Monday:</span>
                            <span className="text-right">{AVAILABLE_HOURS.mon}</span>

                            <span className="text-left">Tuesday:</span>
                            <span className="text-right">{AVAILABLE_HOURS.tues}</span>

                            <span className="text-left">Wednesday:</span>
                            <span className="text-right">{AVAILABLE_HOURS.wed}</span>

                            <span className="text-left">Thursday:</span>
                            <span className="text-right">{AVAILABLE_HOURS.thurs}</span>

                            <span className="text-left">Friday:</span>
                            <span className="text-right">{AVAILABLE_HOURS.fri}</span>

                            <span className="text-left">Saturday:</span>
                            <span className="text-right">{AVAILABLE_HOURS.sat}</span>

                            <span className="text-left">Sunday:</span>
                            <span className="text-right">{AVAILABLE_HOURS.sun}</span>
                        </div>
                    </div>
                </InfoPanel >
            </div>

            <InfoPanel className="mx-auto my-18 p-4 bg-textboxBackground text-textHeading max-w-5xl">
                <h2 id="yard" className="text-center mt-2 mb-4 ">Map of our yard</h2>
                <Image src={IMAGE_ROUTES.images + "lotMapId.svg"} 
                        height={550}
                        width={400} 
                        alt="Map of the yard"
                        className="mx-auto w-3/4"/>
            </InfoPanel>

            <InfoPanel className="mx-auto p-4 bg-textboxBackground text-textHeading max-w-5xl">
                <h2 id="map" className="mt-2 mb-4 text-center">Get Directions!</h2>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5958.416061236006!2d-83.5514029!3d41.69444459999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b80fe6d183959%3A0x38e4f1a93915198b!2s4096%20N%20Detroit%20Ave%2C%20Toledo%2C%20OH%2043612!5e0!3m2!1sen!2sus!4v1768106471445!5m2!1sen!2sus" 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full aspect-4/3"/>

            </InfoPanel>

        </main>
    )
}