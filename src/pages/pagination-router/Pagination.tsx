import { buildQueryString } from "@/service";
import { IFilter } from "@chax-at/prisma-filter-common";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { handlePagination } from "@/utils";
import { Button } from "@/components/ui/button";

const PaginationPage = () => {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const configParams: { [key: string]: string | number } = {};

  urlParams.forEach((value, key) => {
    configParams[key] = isNaN(Number(value)) ? value : Number(value);
  });

  console.log("config params: ", configParams);

  // const fetchAll = () => {
  //   console.log("fetch all");
  //   // tạo query string
  //   const queryString = buildQueryString(params);
  //   console.log("🚀 ~ fetchAll ~ queryString:", queryString);
  // };

  // const query = buildQueryString({
  //   limit: 10,
  //   offset: 0,
  //   filter: [
  //     {
  //       field: "age",
  //       type: FilterOperationType.Eq,
  //       value: 18,
  //     },
  //     {
  //       field: "status",
  //       type: FilterOperationType.Eq,
  //       value: "active",
  //     },
  //   ],
  //   order: [
  //     {
  //       field: "name",
  //       dir: "asc",
  //     },
  //     {
  //       field: "age",
  //       dir: "desc",
  //     },
  //   ],
  // });

  // const { data, isLoading } = useQuery<any>({
  //   queryKey: ["alls", params],
  //   queryFn: () => fetchAll(),
  // });

  const data = {
    count: 400,
    results: [
      {
        name: "tủ lạnh",
        id: "123",
      },
      {
        name: "máy giặt",
        id: "124",
      },
      {
        name: "tivi",
        id: "125",
      },
      {
        name: "quạt điện",
        id: "126",
      },
      {
        name: "bếp gas",
        id: "127",
      },
      {
        name: "máy lạnh",
        id: "128",
      },
      {
        name: "lò vi sóng",
        id: "129",
      },
      {
        name: "máy hút bụi",
        id: "130",
      },
      {
        name: "tủ đông",
        id: "131",
      },
      {
        name: "máy sấy tóc",
        id: "132",
      },
      {
        name: "nồi cơm điện",
        id: "133",
      },
      {
        name: "bàn ủi",
        id: "134",
      },
    ],
  };

  const countPage = useMemo(() => {
    // if (isLoading || !data?.count) return 0;
    const totalPage = Math.ceil(data.count / 2);
    return totalPage;
  }, [data]);

  const pageCurrent = useMemo(() => {
    return configParams?.offset ? configParams.offset / 2 + 1 : 0;
  }, [configParams]);

  return (
    <div>
      <div>Đỗ data ở trên ra</div>
      <div>filter Name</div>
      <div>filter Category</div>
      <div>Search</div>
      <div>
        {configParams?.limit && (
          <Pagination className="flex justify-end mt-4">
            {pageCurrent > 1 && (
              <PaginationItem>
                <PaginationLink href="/...">
                  <PaginationPrevious className="hover:cursor-pointer" />
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationContent className="">
              {handlePagination(pageCurrent, countPage).map((num) =>
                num !== "..." && typeof num === "number" ? (
                  <PaginationItem key={num} className="flex gap-3">
                    <PaginationLink href={`/page=${num}`}>
                      <Button
                        variant={"outline"}
                        className={`border ${
                          num === pageCurrent ? "border-primary" : ""
                        }`}
                      >
                        {num}
                      </Button>
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={num}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              )}
              {pageCurrent < countPage && (
                <PaginationItem>
                  <PaginationLink href="/...">
                    <PaginationNext className="hover:cursor-pointer" />
                  </PaginationLink>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default PaginationPage;
