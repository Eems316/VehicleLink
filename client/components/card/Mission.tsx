import { ccf } from "@/utils/styleFormat";
import * as React from "react";

type MissionProps = React.ComponentPropsWithoutRef<"div">;

const Mission = React.forwardRef<HTMLElement, MissionProps>(function Mission(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref as any}
      className={ccf("", className)}
      {...props}
    />
  );
});

Mission.displayName = "Mission";

export default Mission;