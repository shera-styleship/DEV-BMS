import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDispatchContext } from "@/App";

const Logout = () => {
  const { logout } = useContext(UserDispatchContext);
  const nav = useNavigate();

  useEffect(() => {
    // App 상태 + localStorage 동시 로그아웃
    logout();

    // 강제 이동 (뒤로가기 방지)
    nav("/login", { replace: true });
  }, [logout, nav]);

  return null;
};

export default Logout;
