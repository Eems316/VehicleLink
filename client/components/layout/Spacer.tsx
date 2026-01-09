import { ccf } from "@/utils/styleFormat";
import * as React from "react";

type SpacerProps = React.ComponentPropsWithoutRef<"div">;

const Spacer = React.forwardRef<HTMLElement, SpacerProps>(function Spacer(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref as any}
      className={ccf("bg-transparent", className)}
      {...props}
    >
        {children}
    </div>
  );
});

Spacer.displayName = "Spacer";

export default Spacer;