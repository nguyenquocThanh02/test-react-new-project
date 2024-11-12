import { Route } from "react-router-dom";
import { useProfileHook } from "./useProfile.hook";

interface ProtectedRouteProps extends RouterProps {
  component: React.ComponentType<any>;
  permissionCode: string;
  permissions: Permission[];
}
export const useRouteHook = () => {
  const profile = useProfileHook();

  const data = profile.data?.permissions || [];
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
};
