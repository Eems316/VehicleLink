import { PAGE_SIZE } from "@/constants/vehicle.constants";
import { ccf } from "@/utils/styleFormat";
import * as React from "react";

type customPaginationProps = {
    currentPage: number;
    totalItems: number;
    onPaginationSelect: (value: number) => void;
}
type PaginationProps = React.ComponentPropsWithoutRef<"div"> &
                        customPaginationProps;

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  { className, children, currentPage, totalItems, onPaginationSelect, ...props },
  ref
) {
    const [paginationID, setPaginationID] = React.useState<number>( currentPage ?? '1');

    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    const handlePageDown = (page: number) => {
        if (page - 1 <= 0) return;
        handlePageClick(page - 1);
    }

    const handlePageUp = (page: number) => {
        if (page + 1 > totalPages) return;
        handlePageClick(page + 1);
    }

    const handlePageClick = (page: number) => {
        setPaginationID(page);
        onPaginationSelect(page);
    };

  return (
    <div
        ref={ref}
        className={ccf("text-center text-primaryText", className)}
        {...props}
    >
        {(paginationID > 1) ? (
                <button className="cursor-pointer hover:text-buttonHover mx-1"
                        onClick={() => handlePageDown(paginationID)} 
                >
                    ◀
                </button>
            ):(
                <span className="mx-1">◀</span>
            )}
        

        {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;

            return paginationID === page ? (
                <span key={page} className="mx-1 font-bold">
                    {page}
                </span>
            ) : (
                <button
                    key={page}
                    className="cursor-pointer hover:text-buttonHover mx-1"
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </button>
            );
        })}

        {(paginationID < totalPages) ? (
                <button className="cursor-pointer hover:text-buttonHover mx-1"
                onClick={() => handlePageUp(paginationID)} 
                >
                    ▶
                </button>
            ):(
                <span className="mx-1">▶</span>
        )}

        {children}
    </div>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;