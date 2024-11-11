import "./App.css";
import TestTodo from "./pages/testTodo";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { Redirect, Route, RouterProps, Switch } from "react-router-dom";
import UploadMultipart from "./pages/upload-multipart/UploadMultipart";
import UploadMultipartMultifile from "./pages/upload-multipart/UploadMultiFileMultiPart";
import UploadImg from "./pages/UploadImg.page";
import { useEffect } from "react";
import PaginationPage from "./pages/pagination-router/Pagination";
import LoginPage from "./pages/auth/login/Login.page";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./service";
import ScrollTablePage from "./pages/scrollTable/ScrollTable.page";
interface Permission {
  name: string;
  code: string;
  ordering: number;
  isEnable: boolean;
}

interface ProtectedRouteProps extends RouterProps {
  component: React.ComponentType<any>;
  permissionCode: string;
  permissions: Permission[];
}

function App() {
  // auto refresh token trước 30p
  useEffect(() => {
    const checkRefreshTokenExpiry = () => {
      const exp = Number(localStorage.getItem("access-token"));
      const currentTime = Math.floor(Date.now() / 1000);
      const refreshBufferTime = 30 * 60;

      const timeLeftToExpire = exp - currentTime;

      if (timeLeftToExpire <= refreshBufferTime) {
        console.log("Refreshing token...");
        // gọi  refreshToken, sau đó lưu lại vào local
      } else {
        console.log("Token still valid, waiting to refresh.");
      }
    };

    const interval = setInterval(checkRefreshTokenExpiry, 1000 * 60 * 30);

    return () => clearInterval(interval);
  }, []);

  // xử lý phân quyền, gọi permission từ be
  const permission = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getProfile(),
    staleTime: 5 * 60 * 1000,
  });

  const data = permission.data?.permissions || [];
  console.log("🚀 ~ data ~ form app:", data);

  const hasPermission = (permissionCode: string) => {
    return data.some(
      (permission) => permission.code === permissionCode && permission.isEnable
    );
  };

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    permissionCode,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          hasPermission(permissionCode) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };

  return (
    <MainLayout>
      {/* Route phân quyền */}
      <Switch>
        <ProtectedRoute
          permissionCode="DASHBOARD"
          component={() => <h2>Dashboard</h2>}
          path="/dashboard"
        />
        <ProtectedRoute
          path="/products"
          permissionCode="PRODUCTS"
          component={() => <h2>Products</h2>}
        />
        <ProtectedRoute
          path="/customers"
          permissionCode="CUSTOMERS"
          component={() => <h2>Customers</h2>}
        />
        <ProtectedRoute
          path="/reviews"
          permissionCode="REVIEWS"
          component={() => <h2>Reviews</h2>}
        />
        <Route
          path="/"
          exact
          component={() => <h2>Welcome to Admin Portal</h2>}
        />
      </Switch>

      <Route path="/upload">
        <UploadImg />
      </Route>
      <Route path="/todo">
        <TestTodo />
      </Route>
      <Route path="/pagination-router">
        <PaginationPage />
      </Route>

      <Route path="/scroll-table">
        <ScrollTablePage />
      </Route>

      <Route path="/multipart">
        <UploadMultipart />
      </Route>
      <Route path="/multipart-multifile">
        <UploadMultipartMultifile />
      </Route>

      <Route path="/login">
        <LoginPage />
      </Route>
    </MainLayout>
  );
}

export default App;
