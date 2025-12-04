import "@components/layout/Header.css";
import { useContext, useMemo, useState } from "react";
import { UserDataContext } from "@/App";
import { UserDispatchContext } from "@/App";
import PublicIP from "@components/network/PublicIP";
import { getUserImageSrc } from "@/utils/getUserImageSrc";
import Alarm from "@components/common/Alarm";

function Header({ attendanceToggle, onAttendanceToggle, onLnbToggle }) {
  const { userData = [], auth = { isLoggedIn: false, userId: null } } =
    useContext(UserDataContext);
  const [isAlarm, setIsAlarm] = useState(false);
  const loginUser = useMemo(() => {
    if (!auth?.isLoggedIn) return null;

    try {
      const stored = localStorage.getItem("bms_member");
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (e) {
      console.error("파싱 오류", e);
      return null;
    }
  }, [auth?.isLoggedIn]);  
/*  
  const loginUser = auth?.isLoggedIn
    ? userData?.find((user) => String(user.id) === String(auth.userId)) ?? null
    : null;
*/
  const imgSrc = useMemo(
    () => getUserImageSrc(loginUser?.userImage),
    [loginUser?.userImage]
  );
  const handleAlarmToggle = () => {
    setIsAlarm((prev) => !prev);
  };
  return (
    <header className="Header">
      {/* LNB, PROFILE */}
      <div>
        <button className="lnb-button" onClick={onLnbToggle}>
          LNB Toggle Button
        </button>

        <div className="profile-box">
          <div className="profile-img">
            <img
              src={imgSrc}
              alt={loginUser?.userName || "게스트"}
              onError={(e) => {
                e.currentTarget.src = "/images/default.jpg";
              }}
            />
          </div>
          <div className="profile-info">
            <p className="profile-name">{loginUser?.memberName || "게스트"}</p>
            <p className="profile-status">
              (<PublicIP />) 접속중
            </p>
          </div>
        </div>
      </div>

      {/* 출퇴근 체크, 알림 memberType = 1 스타일쉽직원 */}
      <div>
        {loginUser?.memberType === 1 && (
          <button
            className={`attendance-button ${
              attendanceToggle ? "attendance-active" : ""
            }`}
            onClick={onAttendanceToggle}
          >
            {attendanceToggle ? "퇴근체크" : "출근체크"}
          </button>
        )}
        <button
          className="alarm-button alarm-active"
          onClick={handleAlarmToggle}
        >
          알림
        </button>

        {isAlarm ? <Alarm /> : null}
      </div>
    </header>
  );
}

export default Header;
