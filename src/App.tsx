import "./App.css";
import TestTodo from "./pages/testTodo";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { Route } from "react-router-dom";
import PaginationRouter from "./pages/pagination-router/test";
import UploadMultipart from "./pages/upload-multipart/UploadMultipart";
import UploadMultipartMultifile from "./pages/upload-multipart/UploadMultiFileMultiPart";
import UploadImg from "./pages/UploadImg.page";

function App() {
  return (
    <MainLayout>
      <Route path="/upload">
        <UploadImg />
      </Route>
      <Route path="/todo">
        <TestTodo />
      </Route>
      <Route path="/pagination-router">
        <PaginationRouter />
      </Route>

      <Route path="/multipart">
        <UploadMultipart />
      </Route>
      <Route path="/multipart-multifile">
        <UploadMultipartMultifile />
      </Route>
    </MainLayout>
  );
}

export default App;
