"use client"

import VehicleCard from "@/components/cards/VehicleCard";
import InfoPanel from "@/components/containers/InfoPanel"
import VehicleTable from "@/components/Info/VehicleTable";
import YardMap from "@/components/Info/YardMap";
import { getMakes, getModels, getVehicles, getYears } from "@/routes/routes";
import { VehicleRow } from "@/types/vehicle.types";
import { checkIfEmpty } from "@/utils/dataFormat";
import { ccf } from "@/utils/styleFormat";
import { useEffect, useState } from "react"

export default function Vehicles() {
    const [selectedMake, setSelectedMake] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleRow>();

    const [makesList, setMakesList] = useState<string[]>([])
    const [modelsList, setModelsList] = useState<string[]>([])
    const [yearsList, setYearsList] = useState<string[]>([])
    const [vehiclesList, setVehiclesList] = useState<VehicleRow[]>([])
    const [modelDisabled, setModelDisabled] = useState<boolean>(true);
    const [yearDisabled, setYearDisabled] = useState<boolean>(true);

    const handleVehicleSelection = (v: VehicleRow) => {
        setSelectedVehicle(v);
    }

    const loadVehicles = async () => {
        try{
            const vehicles = await getVehicles(selectedMake, selectedModel, selectedYear);
            setVehiclesList(vehicles);
        } catch (err) {
            console.error("Failed to load vehicles ", err)
            setVehiclesList([]);
        }
    }

    useEffect(() => {
        const loadMakes = async () => {            
            try{
                const makes = await getMakes();
                setMakesList(makes);
            } catch (err) {
                console.error("Failed to load makes ", err);
                setMakesList([]);
            }
        };
        loadMakes();
    }, []);

    useEffect(() => {
        const loadModels = async () => {
            const isEmpty = checkIfEmpty(selectedMake)
            if (isEmpty) {
                setSelectedModel("");
                setSelectedYear("");
                setModelDisabled(isEmpty);
                setYearDisabled(isEmpty);
                setModelsList([]);
                setYearsList([]);
            } else {
                try {
                    const models = await getModels(selectedMake);
                    setModelsList(models);
                    setModelDisabled(isEmpty);
                } catch (err) {
                    console.error("Failed to load models ", err);
                    setSelectedModel("");
                    setSelectedYear("");
                    setModelDisabled(isEmpty);
                    setYearDisabled(isEmpty);
                    setModelsList([]);
                    setYearsList([]);
                }
            }
        };

        loadModels();
    }, [selectedMake]);

    useEffect(() => {
        const loadYears = async () => {
            const isEmpty = checkIfEmpty(selectedModel)
            if (isEmpty) {
                setSelectedYear("");
                setYearDisabled(isEmpty);
                setYearsList([]);
            } else {
                try {
                    const years = await getYears(selectedMake, selectedModel);
                    setYearsList(years);
                    setYearDisabled(isEmpty);
                } catch (err) {
                    console.error("Failed to load years ", err);
                    setSelectedYear("");
                    setYearDisabled(isEmpty);
                    setYearsList([]);
                }
            }
        };

        loadYears();
    }, [selectedModel]);
    

    return(
        <main className="p-2 mx-auto md:max-w-[1800px]">
            <div className="flex flex-wrap justify-center">
                <InfoPanel className="p-2 mx-4 bg-textboxBackground text-primaryText">
                    <span className="font-bold">Make: </span>
                    <select className={"border p-1 rounded-sm bg-formBackground"}
                            onChange={(e) => setSelectedMake(e.target.value)}>
                        <option value={"Any"}>Any</option>
                        {makesList && 
                            makesList.map((make, i) => (
                                <option key={i} value={make}>{make}</option>
                            ))
                        }
                    </select>
                </InfoPanel>

                <InfoPanel className="p-2 mx-4 bg-textboxBackground text-primaryText">
                    <span className="font-bold">Model: </span>
                    <select className={ccf("border p-1 rounded-sm", modelDisabled ? "text-gray-400" : "bg-formBackground cursor-pointer")} 
                            disabled={modelDisabled}
                            onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        <option value={"Any"}>Any</option>
                        {makesList && modelsList &&
                            modelsList.map((model, i) => (
                                <option key={i} value={model}>{model}</option>
                            ))
                        }
                    </select>
                </InfoPanel>

                <InfoPanel className="p-2 mx-4 bg-textboxBackground text-primaryText">
                    <span className="font-bold">Year: </span>
                    <select className={ccf("border p-1 rounded-sm", yearDisabled ? "text-gray-400" : "bg-formBackground cursor-pointer")} 
                            disabled={yearDisabled}
                            onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value={"Any"}>Any</option>
                        {makesList && modelsList && yearsList &&
                            yearsList.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))
                        }
                    </select>
                </InfoPanel>

            </div>
            <div className="mx-auto">
                <button className="mx-auto block py-3 px-4 m-4 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.4)] bg-buttonBackground text-buttonText hover:text-buttonHover cursor-pointer"
                        onClick={loadVehicles}>
                            Search...
                </button>
            </div>
            <InfoPanel className="mx-auto bg-textboxBackground text-textHeading max-w-[1000px]">
                <VehicleTable vehicles={vehiclesList} onVehicleSelect={handleVehicleSelection}>
                    <tr>
                        <td colSpan={6}>
                            <VehicleCard vehicle={selectedVehicle}/>
                        </td>
                    </tr>
                </VehicleTable>
            </InfoPanel>
            <InfoPanel  className="mx-auto bg-textboxBackground text-textHeading max-w-[1000px]">
                <YardMap className="p-4" lotCode={selectedVehicle?.lotSpaceCode? selectedVehicle.lotSpaceCode : ""}></YardMap>
            </InfoPanel>
        </main>
    )
}