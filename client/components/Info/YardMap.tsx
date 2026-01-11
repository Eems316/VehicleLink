import { LOT_COORDS } from "@/constants/vehicle.constants";
import { ccf } from "@/utils/styleFormat";
import * as React from "react";

type YardMapCustomProps = {
    lotCode: string;
}
type YardMapProps = React.ComponentPropsWithoutRef<"div"> &
                            YardMapCustomProps;

const YardMap = React.forwardRef<HTMLDivElement, YardMapProps>(function YardMap(
  { className, children, lotCode, ...props },
  ref
) {

  return (
    <div
        ref={ref}
        className={ccf("", className)}
        {...props}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.71 551.61">
            <g id="Buildings">
                <rect className="cls-3" x="150.5" y="13" width="100" height="50"/>
                <rect className="cls-3" x=".5" y="1.52" width="100" height="75"/>
                <rect className="cls-3" x="259.69" y=".5" width="137.02" height="75"/>
                <text className="cls-7" transform="translate(299.98 37.73)">
                    <tspan className="cls-4" x="0" y="0">Parking Lot</tspan>
                </text>
            </g>

            <g id="lots">
                {LOT_COORDS.map((c,i) => (
                    <rect key={i} className="cls-2" style={lotCode === c.lotCode ? { fill: "var(--color-buttonHover)" } : undefined} x={c.xCoords} y={c.yCoords} width="16" height="25"/>
                ))}
            </g>

            <g id="RowLetters">
                <text className="cls-7" transform="translate(195.59 112.1)"><tspan x="0" y="0">A</tspan></text>
                <text className="cls-7" transform="translate(196.01 139.55)"><tspan x="0" y="0">B</tspan></text>
                <text className="cls-7" transform="translate(195.79 184.17)"><tspan x="0" y="0">C</tspan></text>
                <text className="cls-7" transform="translate(195.27 210.3)"><tspan x="0" y="0">D</tspan></text>
                <text className="cls-7" transform="translate(196.31 255.91)"><tspan x="0" y="0">E</tspan></text>
                <text className="cls-7" transform="translate(196.34 281.66)"><tspan x="0" y="0">F</tspan></text>
                <text className="cls-7" transform="translate(195.39 327.4)"><tspan x="0" y="0">G</tspan></text>
                <text className="cls-7" transform="translate(195.35 352.59)"><tspan x="0" y="0">H</tspan></text>
                <text className="cls-7" transform="translate(197.83 399.14)"><tspan x="0" y="0">I</tspan></text>
                <text className="cls-7" transform="translate(197.05 424.11)"><tspan x="0" y="0">J</tspan></text>
                <text className="cls-7" transform="translate(195.95 469.66)"><tspan x="0" y="0">K</tspan></text>
                <text className="cls-7" transform="translate(196.43 496.81)"><tspan x="0" y="0">L</tspan></text>
                <text className="cls-7" transform="translate(194.44 541.17)"><tspan x="0" y="0">M</tspan></text>
            </g>
        </svg>
        {children}
    </div>
  );
});

YardMap.displayName = "YardMap";

export default YardMap;