import { ccf } from "@/utils/styleFormat";
import * as React from "react";

type InfoPanelProps = React.ComponentPropsWithoutRef<"div">;

const InfoPanel = React.forwardRef<HTMLElement, InfoPanelProps>(function InfoPanel(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref as any}
      className={ccf("my-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.4)]", className)}
      {...props}
    >
      {children}
    </div>
  );
});

InfoPanel.displayName = "InfoPanel";

export default InfoPanel;