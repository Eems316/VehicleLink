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
        <div>
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
            <div className="mx-auto w-fit max-w-md px-2">
                <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1" >
                    {children}
                </div>
            </div>
        }
    </div>
  );
});

PartsCard.displayName = "PartsCard";

export default PartsCard;