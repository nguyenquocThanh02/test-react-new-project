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

  // const a = queryString;
  // console.log("query: ", a);
  // const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Giả sử chúng ta muốn thêm "search" và "page" vào query string hiện tại
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
