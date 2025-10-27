// src/App.jsx
import "@/App.css";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { useState, createContext, useEffect, useContext } from "react";

import Home from "@/pages/Home";
import Project from "@/pages/Project";
import MyProject from "@/pages/MyProject";
import Schedule from "@/pages/Schedule";
import Knowledge from "@/pages/Knowledge";
import Hr from "@/pages/Hr";
import Setting from "@/pages/Setting";
import Login from "@/pages/Login";

import { API_BASE } from "@/utils/env";

// 컨텍스트
export const UserDataContext = createContext();
export const UserDispatchContext = createContext();

// 로그인 안되어 있을 경우 /login 으로 이동
function RequireAuth() {
  const { auth } = useContext(UserDataContext);
  const location = useLocation();
  if (!auth?.isLoggedIn) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

// 로그인 되어 있을 경우 / 홈으로 이동
function RequireGuest() {
  const { auth } = useContext(UserDataContext);
  if (auth?.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

function App() {
  const [userData, setUserData] = useState([]); // 서버의 사용자 목록
  const [auth, setAuth] = useState({ isLoggedIn: false, userId: null });
  const [alertState, setAlertState] = useState("");

  // 프로젝트 갱신 관련 상태
  const [projectRefresh, setProjectRefresh] = useState(false);
  const refreshProjects = () => setProjectRefresh((prev) => !prev);

  const handleAlertBtn = () =>
    setAlertState((prev) => (prev === "on" ? "" : "on"));

  // (기존 useEffect 내부)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/userInfo`);
        if (!res.ok) throw new Error("Failed to load users");
        const list = await res.json();
        setUserData(list);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // 로그인/로그아웃만 디스패치 컨텍스트로 제공
  const login = (id) => setAuth({ isLoggedIn: true, userId: id });
  const logout = () => setAuth({ isLoggedIn: false, userId: null });

  return (
    <UserDataContext.Provider
      value={{
        userData, // 목록 조회용
        setUserData, // 필요 시 다른 페이지에서 갱신할 수 있게 노출(선택)
        auth,
        alertState,
        handleAlertBtn,
        projectRefresh,
        refreshProjects,
      }}
    >
      <UserDispatchContext.Provider value={{ login, logout }}>
        <Routes>
          {/* 비로그인 전용: 로그인 페이지 */}
          <Route element={<RequireGuest />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>

          {/* 로그인 필요: 메인 앱 */}
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route index element={<Project />} />
              <Route path="/" element={<Project />} />
              <Route path="/Project" element={<Project />} />
              <Route path="/Project/:projectNo" element={<Project />} />
              <Route path="/MyProject" element={<MyProject />} />
              <Route path="/Schedule" element={<Schedule />} />
              <Route path="/Knowledge" element={<Knowledge />} />
              <Route path="/Hr" element={<Hr />} />
              <Route path="/Setting" element={<Setting />} />
            </Route>
          </Route>

          {/* 기타 경로 정리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
