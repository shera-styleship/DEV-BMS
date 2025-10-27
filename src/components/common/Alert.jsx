import "@components/common/Alert.css";
import { useState, useContext, useEffect } from "react";
import Button from "@components/common/Button";
import { UserDataContext } from "@/App";
import { UserDispatchContext } from "@/App";

const Alert = ({ title, children, alertType = true }) => {
  const { handleAlertBtn, alertState } = useContext(UserDataContext);
  useEffect(() => {
    if (alertState === "on") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [alertState]);

  return (
    <div className={`alert_modal ${alertState}`}>
      <div className={`alert_wrap ${alertState}`}>
        <div className="alert_box">
          <div className="alert_title">{title}</div>
          <div className="alert_txt">{children}</div>
          <div className="alert_btn">
            <Button onClick={handleAlertBtn} btnSize="small" btnChar="orange">
              확인
            </Button>
            {alertType ? (
              <Button onClick={handleAlertBtn} btnSize="small" btnChar="white">
                취소
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
