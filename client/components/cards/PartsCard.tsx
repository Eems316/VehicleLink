import { ccf } from "@/utils/styleFormat";
import * as React from "react";

type PartsCardCustomProps = {
    category: string;
}

type PartsCardProps = React.ComponentPropsWithoutRef<"div"> &
                        PartsCardCustomProps;

const PartsCard = React.forwardRef<HTMLDivElement, PartsCardProps>(function PartsCard(
  { className, children, category, ...props },
  ref
) {

    const [isOpen, setIsOpen] = React.useState<Boolean>(false);
    
  return (
    <div
      ref={ref as any}
      className={ccf("", className)}
      {...props}
    >
        <div className="">
            <button className="text-left cursor-pointer text-buttonText hover:text-buttonHover" onClick={() => setIsOpen(!isOpen)}>
                <span className="border rounded-md px-1 py-[.5] m-2">
                    {isOpen ? '–' : '+'}
                </span>
                <span className="text-left text-[1.2em] font-bold">
                    {category}
                </span>
            </button>
        </div>

        {isOpen && 
            <ul className="text-left">
                {children}
            </ul>
        }
    </div>
  );
});

PartsCard.displayName = "PartsCard";

export default PartsCard;