import { useSlideOnScroll } from "@/hooks/useSlideOnScroll";
import { ccf } from "@/utils/styleFormat";

function SlidePanel({
  children,
  className = "",
  direction = "right",
  vOffset = 300,
  mvOffset = 300,
  rootMargin = "0px 100% 0px",
  threshold = 0,
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  vOffset?: number;
  mvOffset?: number;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}) {

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  console.log(isMobile);

  const slideOffset = isMobile ? mvOffset : vOffset;

  const computedRootMargin = `-${slideOffset}px ${rootMargin}`;
  console.log(slideOffset);

  const ref = useSlideOnScroll<HTMLDivElement>({
    // Shape of Observer box
    rootMargin: computedRootMargin,
    // how much of the element must be inside the Observer box
    threshold,
    // controls whether the element comes back
    once,
  });

  return (
    <div
      ref={ref}
      style={direction === "left"
              ? ({ ["--slideX" as any]: "-120%" } as React.CSSProperties)
              : ({ ["--slideX" as any]: "120%" } as React.CSSProperties)
            }
      className={ccf(className)}
      >
        {children}
    </div>
  );
}

SlidePanel.displayName = "SlidePanel"

export default SlidePanel;