import "./App.css";
import TestTodo from "./pages/testTodo";
import UploadImgPage from "./pages/UploadImg.page";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { Route } from "react-router-dom";
import PaginationRouter from "./pages/pagination-router/test";

function App() {
  return (
    <MainLayout>
      <Route path="/upload">
        <UploadImgPage />
      </Route>
      <Route path="/todo">
        <TestTodo />
      </Route>
      <Route path="/pagination-router">
        <PaginationRouter />
      </Route>
      {/* <div className="text-red-600">
        <Button>Click me</Button>
        <img
          src={
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          }
          alt="jhsdakjf"
          loading="eager"
        />
        <h2>Đăng ký</h2>
        <h3>Toàn thêm 222</h3>
        <h3>Thánh thêm vô</h3>
        <h2>Profile</h2>
        <h2>Toàn thêm 2</h2>
        <h2>Toàn thêm 111</h2>
        <h2>Toàn thêm 222</h2> */}

      {/* complete */}
      {/* <UploadImgPage /> */}

      {/* test todo handler */}
      {/* <TestTodo /> */}

      {/* </div> */}
    </MainLayout>
  );
}

export default App;
