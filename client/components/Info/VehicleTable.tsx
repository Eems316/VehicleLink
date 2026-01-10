import { VehicleRow } from "@/types/vehicle.types";
import { formatLocalDate, sortBy } from "@/utils/dataFormat";
import { ccf } from "@/utils/styleFormat";
import * as React from "react";
import Pagination from "../buttons/Pagination";
import { PAGE_SIZE } from "@/constants/vehicle.constants";

type VehicleCustomProps = {
    vehicles?: VehicleRow[];
    caption?: string;
    onVehicleSelect: (v: VehicleRow) => void; 
}

type VehicleTableProps = React.ComponentPropsWithoutRef<"table"> &
    VehicleCustomProps;
    
const VehicleTable = React.forwardRef<HTMLTableElement, VehicleTableProps>(function VehicleTable(
  { className, children, vehicles, onVehicleSelect, caption, ...props },
  ref
) {

    const [sortKey, setSortKey] = React.useState<keyof VehicleRow>("make");
    const [direction, setDirection] = React.useState<"asc" | "desc">("asc");

    const [page, setPage] = React.useState<number>(1);

    const sortedVehicles = React.useMemo(() => {
        return sortBy(vehicles ? vehicles : [], sortKey, direction);
    }, [vehicles, sortKey, direction]);

    function onSort(key: keyof VehicleRow) {
        setDirection(d =>
            key === sortKey ? (d === "asc" ? "desc" : "asc") : "asc"
        );
        setSortKey(key);
    }

    function sortIndicator(key: keyof VehicleRow) {
        if (key !== sortKey) return null;
        return direction === "asc" ? " ▲" : " ▼";
    }

    const onPaginationSelect = (p: number) => {
        setPage(p);
    }

    return (
        <table
            ref={ref}
            className={ccf("w-full border-spacing-y-1", className)}
            {...props}
        >
            {caption ? <caption>{caption}</caption> : null}
            
            <thead>
                <tr>
                    <th className="[display:table-cell]">
                        <button type="button" onClick={() => onSort("make")} className="text-left cursor-pointer select-none">
                            {sortIndicator("make")}Make
                        </button>
                        <span> / </span>
                        <button type="button" onClick={() => onSort("model")} className="text-left cursor-pointer select-none">
                            Model{sortIndicator("model")}
                        </button>
                    </th>

                    <th className="[display:table-cell] ">
                        <button type="button" onClick={() => onSort("year")} className="w-[8ch] text-center cursor-pointer select-none">
                            Year{sortIndicator("year")}
                        </button>
                    </th>

                    <th className="[display:table-cell] ">
                        <button type="button" onClick={() => onSort("lotSpaceCode")} className="w-[8ch] text-left cursor-pointer select-none">
                            Space{sortIndicator("lotSpaceCode")}
                        </button>
                    </th>

                    <th className="hidden md:[display:table-cell] ">
                        <button type="button" onClick={() => onSort("color")} className="w-[12ch] text-left cursor-pointer select-none">
                            Color{sortIndicator("color")}
                        </button>
                    </th>

                    <th className="hidden md:[display:table-cell] ">
                        <button type="button" onClick={() => onSort("odometer")} className="w-[15ch] text-left cursor-pointer select-none">
                            Odometer{sortIndicator("odometer")}
                        </button>
                    </th>

                    <th className="hidden sm:[display:table-cell] ">
                        <button type="button" onClick={() => onSort("vin")} className="w-[25ch] text-left cursor-pointer select-none">
                            VIN{sortIndicator("vin")}
                        </button>
                    </th>

                    <th className="hidden md:[display:table-cell] ">
                        <button type="button" onClick={() => onSort("dateReceived")} className="w-[15ch] text-left cursor-pointer select-none">
                            Date Received{sortIndicator("dateReceived")}
                        </button>
                    </th>
                </tr>
            </thead>

            <tbody>
                {sortedVehicles.slice((page - 1) * PAGE_SIZE, page * 10).map((v, i) => (
                    
                    <tr key={v.vin} onClick={() => {onVehicleSelect(v)}}
                        className={ccf(" border-t border-b border-t-tableBorder border-b-tableBorder cursor-pointer",
                                    i % 2 === 0 ? "bg-tableSecondaryBackground" : "",
                    )}>
                        <td className="[display:table-cell] text-center">{v.make} {v.model}</td>
                        <td className="[display:table-cell] w-[8ch] text-center">{v.year}</td>
                        <td className="[display:table-cell] w-[8ch] text-left">{v.lotSpaceCode}</td>
                        <td className="hidden md:[display:table-cell] w-[12ch] text-left">{v.color}</td>
                        <td className="hidden md:[display:table-cell] w-[15ch] text-left">{v.odometer}</td>

                        <td className="hidden sm:[display:table-cell] w-[15ch] text-left">{v.vin}</td>

                        <td className="hidden md:[display:table-cell] w-[15ch] text-left">{formatLocalDate(v.dateReceived ? v.dateReceived : "")}</td>
                    </tr>
                    
                ))}
                {children}
            </tbody>
            
            <tfoot>
                <tr>
                    <td className="h-4" colSpan={6}>
                        <Pagination currentPage={page} 
                                    totalItems={vehicles?.length? vehicles.length : 0} 
                                    onPaginationSelect={onPaginationSelect} />
                    </td>
                </tr>

            </tfoot>
        </table>
    );
});

VehicleTable.displayName = "VehicleTable";

export default VehicleTable;