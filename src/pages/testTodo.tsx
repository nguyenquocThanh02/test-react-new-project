import { buildQueryString } from "@/service";
import { FilterOperationType } from "@chax-at/prisma-filter-common";
import { Link, useLocation } from "react-router-dom";

type typeFCHandler = (arr: number[]) => number[];

const TestTodo = () => {
  const handler = (handleFC: typeFCHandler) => {
    const arr = [1, 2, 3];
    console.log("before handler", arr);

    const x = handleFC(arr);
    console.log("after handler", x);
  };

  const test = () => {
    handler((arr: number[]) => [...arr, 4]);
  };

  test();

  const query = buildQueryString({
    limit: 10,
    offset: 0,
    filter: [
      {
        field: "age",
        type: FilterOperationType.Eq,
        value: 18,
      },
      {
        field: "status",
        type: FilterOperationType.Eq,
        value: "active",
      },
    ],
    order: [
      {
        field: "name",
        dir: "asc",
      },
      {
        field: "age",
        dir: "desc",
      },
    ],
  });

  console.log("query: ", query);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  queryParams.set("search", "query");
  queryParams.set("page", "2");

  const newSearch = queryParams.toString();

  return (
    <div>
      <Link to={`/${newSearch}`}>Chuyển</Link>
    </div>
  );
};

export default TestTodo;
