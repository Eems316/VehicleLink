import { ccf } from "@/utils/styleFormat";
import Link, { LinkProps } from "next/link";
import * as React from "react";

type HeaderButtonProps = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

const HeaderButton = React.forwardRef<HTMLElement, HeaderButtonProps>(function HeaderButton(
  { className, children, ...props },
  ref
) {
  return (
    <Link
      ref={ref as any}
      className={ccf("hidden lg:flex lg:justify-around text-center py-10 font-bold text-2xl",
                    "hover:text-navTextHover",
                    "bg-navBackground h-[100px] w-[10%] min-w-[100px] mx-4 my-2 shadow-[0_-10px_6px_rgba(0,0,0,0.45),0_0_10px_2px_rgba(0,0,0,0.45)]",
                    "hover:my-1 hover:shadow-[0_-5px_6px_rgba(0,0,0,0.45),0_0_10px_1px_rgba(0,0,0,0.45)]",
                    "transition-[margin,box-shadow,color] duration-200 ease-out", className)}
      {...props}
    >
        {children}
    </Link>
  );
});

HeaderButton.displayName = "HeaderButton";

export default HeaderButton;