import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  children,
  onClick,
  btnSize,
  btnChar,
  btnType = "button",
}) => {
  return (
    <>
      <button
        type={btnType}
        onClick={onClick}
        className={`Button Button_${btnSize} Button_${btnChar}`}
      >
        {children}
      </button>
    </>
  );
};
export default Button;

// Props
// 1. children: 버튼 안에 들어갈 글자
// 2. onClick: 클릭했을때의 이벤트 함수
// 3. btnSize: 버튼 사이즈 -> small, middle, big
// 4. btnChar: 버튼 색 -> orange, white

/** 버튼 컴포넌트 – 라벨/크기/색상 지정 가능 */
Button.propTypes = {
  /** 버튼 안에 들어갈 내용(텍스트/노드) */
  children: PropTypes.node.isRequired,
  /** 클릭했을 때 실행되는 함수 */
  onClick: PropTypes.func,
  /** 버튼 크기: small | middle | big */
  btnSize: PropTypes.oneOf(["small", "middle", "big"]),
  /** 버튼 색상 테마: orange | white */
  btnChar: PropTypes.oneOf(["orange", "white"]),
  /** 네이티브 button 타입 */
  btnType: PropTypes.oneOf(["button", "submit", "reset"]),
};

// 기본값을 표에 보여주고 싶으면 defaultProps로 명시(권장)
Button.defaultProps = {
  btnType: "button",
  children: "Button",
  btnSize: "big",
  btnChar: "orange",
};
