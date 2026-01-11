"use client"

import PartsCard from "@/components/cards/PartsCard";
import InfoPanel from "@/components/containers/InfoPanel"
import { getParts } from "@/routes/routes";
import { PartCategory } from "@/types/parts.types";
import { groupPartsByCategory } from "@/utils/partsFormat";
import React from "react";
import { useEffect, useState } from "react";

export default function Parts() {

    const [partsList, setPartsList] = useState<PartCategory[]>([]);
    
        useEffect(()=> {
            const loadParts = async () => {
                try {
                    const parts = await getParts();
                    const groupedParts = groupPartsByCategory(parts);
                    setPartsList(groupedParts);
                } catch (err) {
                    console.error(err)
                    setPartsList([]);
                }
            }
            loadParts()
        }, [])

    return(
        <main className="p-2 mx-auto md:max-w-[1800px]">
            <InfoPanel className="mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-textboxBackground text-textHeading max-w-5xl">
                <h1 className="m-4 text-center md:col-span-2 text-textHeading">Parts List</h1>
                {partsList && partsList.map((pc) => (
                    <PartsCard key={pc.category} category={pc.category}>
                        {pc.parts.map((p) => 
                            <React.Fragment key={p.partId}>
                                <span className="text-left whitespace-nowrap overflow-hidden text-ellipsis pr-2">{p.name}: </span>
                                <span className="text-right tabular-nums">${p.price}</span>
                            </React.Fragment>
                        )}
                    </PartsCard>
                ))}
            </InfoPanel>
        </main>
    )
}