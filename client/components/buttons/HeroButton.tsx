import { ccf } from "@/utils/styleFormat";
import Link, { LinkProps } from "next/link";
import * as React from "react";
import InfoPanel from "../containers/InfoPanel";

type HeroButtonProps =
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
    LinkProps & {
        className?: string;
  };

const HeroButton = React.forwardRef<HTMLAnchorElement, HeroButtonProps>(
    function HeroButton({ className, children, ...props }, ref) {
        return (
        <Link
            ref={ref}
            className={ccf(className)}
            {...props}
        >
            <InfoPanel className="p-6 bg-textboxBackground text-textHeading group">
                {children}
            </InfoPanel>
        </Link>
        );
    }
);

HeroButton.displayName = "HeroButton";
export default HeroButton;