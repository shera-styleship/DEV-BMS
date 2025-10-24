import { useContext, useMemo, useState } from "react";
import { UserDataContext } from "../../App";
import { UserDispatchContext } from "../../App";
import PublicIP from "../network/PublicIP";
import { getUserImageSrc } from "../../utils/getUserImageSrc";

function Header({ attendanceToggle, onAttendanceToggle, onLnbToggle }) {
  const { userData = [], auth = { isLoggedIn: false, userId: null } } =
    useContext(UserDataContext);
  const { logout } = useContext(UserDispatchContext);
  const [gnbState, setGnbState] = useState("");
  const loginUser = auth?.isLoggedIn
    ? userData?.find((user) => String(user.id) === String(auth.userId)) ?? null
    : null;
  const imgSrc = useMemo(
    () => getUserImageSrc(loginUser?.userImage),
    [loginUser?.userImage]
  );
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
            <p className="profile-name">{loginUser?.userName || "게스트"}</p>
            <p className="profile-status">
              (<PublicIP />) 접속중
            </p>
          </div>
        </div>
      </div>

      {/* 출퇴근 체크, 알림 */}
      <div>
        {loginUser?.userCompany?.toLowerCase() === "styleship" && (
          <button
            className={`attendance-button ${
              attendanceToggle ? "attendance-active" : ""
            }`}
            onClick={onAttendanceToggle}
          >
            {attendanceToggle ? "퇴근체크" : "출근체크"}
          </button>
        )}
        <button className="alarm-button alarm-active">알림</button>
      </div>
    </header>
  );
}

export default Header;
