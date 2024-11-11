import { Button } from "@/components/ui/button";
import { localStorageKey } from "@/constants";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const route = useHistory();

  const handleLogin = () => {
    localStorage.setItem(localStorageKey.accessToken, "token-test-123");
    alert("Đã đăng nhập");
    route.push("/");
  };
  return (  
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
