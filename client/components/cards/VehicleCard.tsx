import { IMAGE_ROUTES } from "@/routes/routes";
import { VehicleRow } from "@/types/vehicle.types";
import { checkIfEmpty, formatLocalDate } from "@/utils/dataFormat";
import { ccf } from "@/utils/styleFormat";
import * as React from "react";
import Image from "next/image";

type VehicleCardCustomProps = {
    vehicle?: VehicleRow;
};
type VehicleCardProps = React.ComponentPropsWithoutRef<"div"> &
                        VehicleCardCustomProps;

const VehicleCard = React.forwardRef<HTMLDivElement, VehicleCardProps>(function VehicleCard(
    { className, children, vehicle, ...props },
    ref
) {
    if(!vehicle) return null;

    return (
        <div
            ref={ref as any}
            className={ccf("grid grid-cols-1 md:grid-cols-2 gap-6", className)}
            {...props}
        >
            {!checkIfEmpty(vehicle.model) &&
                <div className="py-4 px-8">
                    <p><strong>Make: </strong>{vehicle.make}</p> 
                    <p><strong>Model: </strong>{vehicle.model}</p> 
                    <p><strong>Year: </strong>{vehicle.year}</p>
                    <p><strong>Color: </strong>{vehicle.color}</p>
                    <p><strong>VIN: </strong>{vehicle.vin}</p>
                    <p><strong>Odometer: </strong>{vehicle.odometer}</p>
                    <p><strong>Date Received: </strong>{formatLocalDate(vehicle.dateReceived? vehicle.dateReceived : "")}</p>
                    <p><strong>Space: </strong>{vehicle.lotSpaceCode}</p>
                </div>
            }

            {vehicle.vin &&
            <div>
                            {/* Add the proper route "vehicle.vin" to image below */}
                <Image src={IMAGE_ROUTES.vehicles + "0LHLWGBW12NESGWHC" + ".JPG"}
                        width={900/2}
                        height={600/2}
                        alt={`${vehicle.color} ${vehicle.make} ${vehicle.model} with ${vehicle.odometer} miles`}
                        className="h-auto w-full p-4 rounded-3xl"
                />
            </div>
            }
            
            {children}
        </div>
    );
});

VehicleCard.displayName = "VehicleCard";

export default VehicleCard;