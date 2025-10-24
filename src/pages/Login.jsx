import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { UserDataContext } from "../App";
import { UserDispatchContext } from "../App";
import styleshipLogo from '../assets/images/common/styleship_logo.png'

const STORAGE_KEY = "remembered_username"; // 로컬스토리지 키

const Login = () => {
  const nav = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [rememberId, setRememberId] = useState(false); // 체크박스 상태
  const { userData, handleAlertBtn } = useContext(UserDataContext);
  const { login } = useContext(UserDispatchContext);
  const [error, setError] = useState("");

  // 첫 로드 시 저장된 아이디 복원
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setLoginId(saved);
      setRememberId(true);
    }
  }, []);

  const openAlert = (content) => {
    setError(content);
    handleAlertBtn();
  };

  const handleLogin = () => {
    const id = loginId.trim();
    const pw = loginPw.trim();

    if (!id && !pw) {
      openAlert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    if (!id) {
      openAlert("아이디를 입력하세요.");
      return;
    }
    if (!pw) {
      openAlert("비밀번호를 입력하세요.");
      return;
    }

    // 아이디가 일치하는 사용자 찾기(없으면 undefined)
    const user = userData.find((u) => String(u.userId) === String(id));
    if (!user) {
      openAlert("해당 아이디가 존재하지 않습니다.");
      return;
    }
    if (user.userPassword !== pw) {
      openAlert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 여기서 아이디 저장/삭제 처리
    if (rememberId) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);

    if (login) {
      login(user.id); // 전역 로그인
    }
    nav("/"); // 홈으로 이동
  };

  return (
    <>
      <div className="Login_wrap">
        <div className="Login_box">
          <img
            className="styleship_logo"
            src={styleshipLogo}
            alt="스타일쉽 로고"
          />
          <div className="Login_form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <Input
                inputPlaceholder="아이디"
                inputValue={loginId}
                setValue={setLoginId}
                inputChar="login"
                // 가능하면 내부 input에 전달되도록 자동완성 힌트도 추가
                // autoComplete="username"
              />
              <Input
                inputType="password"
                inputPlaceholder="비밀번호"
                inputValue={loginPw}
                setValue={setLoginPw}
                inputChar="login"
                toggleVisibility
                // autoComplete="current-password"
              />

              {/* 아이디 저장 체크박스 */}
              <label className="Login_id_remember">
                <input
                  type="checkbox"
                  checked={rememberId}
                  onChange={(e) => setRememberId(e.target.checked)}
                />
                <span className="Login_id_remember_checkbox"></span>
                아이디 저장
              </label>

              {/* 로그인 버튼은 type="submit" */}
              <Button btnType="submit" btnSize="big" btnChar="orange">
                로그인
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Alert title="알림" alertType={false}>
        {error}
      </Alert>
    </>
  );
};

export default Login;
