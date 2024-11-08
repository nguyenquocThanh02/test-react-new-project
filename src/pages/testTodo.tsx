import { buildQueryString } from "@/service";
import { log } from "console";
import { Link } from "react-router-dom";

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

  const a = buildQueryString({
    limit: 1,
  });
  console.log("query: ", a);

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
