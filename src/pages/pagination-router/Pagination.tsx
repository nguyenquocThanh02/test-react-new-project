import { FilterOperationType, IFilter } from "@chax-at/prisma-filter-common";
import React, { useMemo, useState } from "react";
import SearchComponent from "./Search.component";
import CountPageComponent from "./countPage.component";
import PaginationComponent from "./pagination.component";

const PaginationPage = () => {
  const [params, setParams] = useState<IFilter>({
    limit: 2,
    offset: 0,
    filter: [
      {
        field: "fullName",
        type: FilterOperationType.Eq,
        value: undefined,
      },
      {
        field: "phone",
        type: FilterOperationType.Eq,
        value: undefined,
      },
      {
        field: "email",
        type: FilterOperationType.Eq,
        value: undefined,
      },
    ],
    order: [],
  });
  console.log("🚀 ~ PaginationPage ~ params:", params);

  // gọi useQuery lấy customer
  const data = {
    count: 12,
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

  const totalPage = useMemo(() => {
    const totalPage = params.limit ? Math.ceil(data.count / params.limit) : 1;
    return totalPage;
  }, [params, data]);

  return (
    <div className="mt-10">
      <SearchComponent setParams={setParams} />
      <div className="gap-3 flex justify-center items-center">
        <PaginationComponent
          totalPage={totalPage}
          setParams={setParams}
          params={params}
        />
        <CountPageComponent setParams={setParams} />
      </div>
    </div>
  );
};

export default PaginationPage;
