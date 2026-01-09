"use client";

import InfoPanel from "@/components/containers/InfoPanel";
import SlidePanel from "@/components/effects/SlidePanel";
import Spacer from "@/components/layout/Spacer";
import { HOME_HEADING, HOME_PANELS } from "@/constants/home.constants";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex items-center justify-center font-sans overflow-x-hidden">
      <main className="bg-repeat-y bg-center w-3xl"
            style={{backgroundImage: "url('/chain.png')",
            backgroundSize: "clamp(3px, .5vw, 15px) auto",
            }}>
        <div id="main-content" className="relative z-998 mx-24 lg:max-w-5xl">

          <Spacer className="my-4 md:my-6 lg:my-32"/>
          
          <SlidePanel className="md:w-[75%] mx-auto" 
                      direction="right">
            <InfoPanel className="bg-textboxBackground text-textHeading">
              <h1 className="text-center p-4">{HOME_HEADING}</h1>
            </InfoPanel>
          </SlidePanel>

          <Spacer className="my-28"/>

          {HOME_PANELS.map((text, index) => (
            <SlidePanel
              key={index}
              className="mx-auto"
              direction={index % 2 === 0 ? "right" : "left"}>
              <InfoPanel
                className="mx-auto bg-textboxBackground text-textHeading"
                >
                  <p className="p-4">{text}</p>
              </InfoPanel>
            </SlidePanel>
          ))}
        </div>

        <Image
            src="/hoist.png"
            alt="VehicleLink"
            width={1980}
            height={1855}
            className="fixed h-auto w-95% min-w-[425px] m-auto left-1/2 top-[50px] -translate-x-1/2 z-995 pointer-events-none"
            priority
        />
      </main>
    </div>
  );
}
