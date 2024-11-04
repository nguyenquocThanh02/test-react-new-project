import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="text-red-600">
        <Button>Click me</Button>
        <img
          src={
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          }
          alt="dkfls"
          loading="eager"
        />
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
      </div>
    </>
  );
}

export default App;
