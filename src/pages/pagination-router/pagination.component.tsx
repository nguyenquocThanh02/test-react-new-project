import { IFilter } from "@chax-at/prisma-filter-common";
import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { handlePagination } from "@/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PaginationComponent: React.FC<{
  params: IFilter;
  setParams: React.Dispatch<React.SetStateAction<IFilter>>;
  totalPage: number;
}> = ({ params, setParams, totalPage }) => {
  const pageCurrent = useMemo(() => {
    return params?.offset && params?.limit
      ? params.offset / params.limit + 1
      : 1;
  }, [params]);

  const selectPage = (num: number) => {
    setParams((prev) => ({
      ...prev,
      offset: params?.limit ? (num - 1) * params.limit : 0,
    }));
  };
  return (
    <div>
      <Pagination className="flex justify-end">
        <PaginationContent className="">
          {pageCurrent > 1 && (
            <PaginationItem>
              <PaginationPrevious className="hover:cursor-pointer" />
            </PaginationItem>
          )}
          {handlePagination(pageCurrent, totalPage).map((num) =>
            num !== "..." && typeof num === "number" ? (
              <PaginationItem key={num} className="flex gap-3">
                <Button
                  variant={"outline"}
                  className={cn("border", {
                    "bg-slate-400": num === pageCurrent,
                  })}
                  onClick={() => selectPage(num)}
                >
                  {num}
                </Button>
              </PaginationItem>
            ) : (
              <PaginationItem key={num}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          {pageCurrent < totalPage && (
            <PaginationItem>
              <PaginationNext className="hover:cursor-pointer" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
