import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="AuthWrap">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
