import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Lnb from "@/components/layout/Lnb";

function AppLayout() {
  const [lnbToggle, setLnbToggle] = useState(true);
  const [attendanceToggle, setAttendanceToggle] = useState(true);

  return (
    <div className={`Wrap ${lnbToggle ? "" : "lnb-off"}`}>
      <Header
        attendanceToggle={attendanceToggle}
        onAttendanceToggle={() => setAttendanceToggle((on) => !on)}
        onLnbToggle={() => setLnbToggle((on) => !on)}
      />

      <div className="ContentWrap">
        <Lnb />

        <div className="Contents">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
