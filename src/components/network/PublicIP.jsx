import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PublickIP = () => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => {
        console.error("IP 가져오기 실패:", err);
        setIp("불러오기 실패");
      });
  }, []);

  return <span>{ip || "불러오는 중..."}</span>;
};

export default PublickIP;

/** PropTypes & 기본값 */
PublickIP.propTypes = {
  /** 로딩 중 표시 문구 */
  loadingText: PropTypes.string,
  /** 에러 시 표시 문구 */
  errorText: PropTypes.string,
  /** 래퍼 span에 적용할 클래스 */
  className: PropTypes.string,
};

PublickIP.defaultProps = {
  loadingText: "불러오는 중...",
  errorText: "불러오기 실패",
  className: "",
};
