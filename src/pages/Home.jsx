import { Link } from "react-router-dom";

const Home = () => {
  return (
    <p>
      홈<br />
      왼쪽 하단 로고 누르면 홈 이동
      <br />
      <Link to="/Login" style={{ color: "gold", textDecoration: "underline" }}>
        로그인 화면으로 이동&nbsp;
        <span style={{ fontSize: "20px" }}>
          (로그인 되어 있으면 홈으로 이동)
        </span>
      </Link>
      <br />
      test01/1234
      <br /> test02/5678 (소속 : styleship)
      <br /> test03/0000
    </p>
  );
};

export default Home;
