// src/components/form/Input.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "@components/common/Input.css";
import invisible from "@/assets/images/icon/invisible.png";
import visible from "@/assets/images/icon/visible.png";

/**
 * 공용 Input 컴포넌트
 * - password 타입 + toggleVisibility=true 일 때 보기/숨기기 토글 제공
 * - file 타입일 때는 value를 제어하지 않고 onChange로 File 객체를 반환
 */
const Input = ({
  inputType,
  inputPlaceholder,
  inputValue,
  inputLabel,
  setValue,
  inputChar,
  toggleVisibility,
  inputAble,
}) => {
  const [showPw, setShowPw] = useState(false);

  const isPassword = inputType === "password";
  const effectiveType =
    isPassword && toggleVisibility ? (showPw ? "text" : "password") : inputType;

  const isFile = inputType === "file";

  const handleChange = (e) => {
    if (isFile) {
      const file = e.target.files?.[0] ?? null;
      setValue?.(file);
    } else {
      setValue?.(e.target.value);
    }
  };

  // file 타입은 value를 넘기면 안 됨(브라우저가 막음)
  const valueProp = isFile ? {} : { value: inputValue ?? "" };

  return (
    <label className="input_label_wrap">
      {inputLabel || ""}
      <input
        type={effectiveType}
        placeholder={inputPlaceholder}
        {...valueProp}
        onChange={handleChange}
        className={`Input${inputChar ? ` Input_${inputChar}` : ""}`}
      />

      {isPassword && toggleVisibility && (
        <button
          type="button"
          className="Input_toggle"
          onClick={() => setShowPw((cur) => !cur)}
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
          aria-pressed={showPw}
        >
          {showPw ? (
            <img src={invisible} alt="비밀번호 숨김" />
          ) : (
            <img src={visible} alt="비밀번호 보기" />
          )}
        </button>
      )}
    </label>
  );
};

export default Input;

/** input의 type */
Input.propTypes = {
  /** input의 타입. password일 때 toggleVisibility=true면 보기/숨기기 버튼 표시 */
  inputType: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "file",
    "tel",
    "url",
    "search",
    "date",
    "time",
    "datetime-local",
    "color",
  ]),
  /** placeholder 텍스트 */
  inputPlaceholder: PropTypes.string,
  /** 입력 값(제어 컴포넌트). file 타입일 때는 무시됨 */
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 라벨 텍스트 */
  inputLabel: PropTypes.string,
  /** onChange 시 값을 부모 state에 전달할 setter */
  setValue: PropTypes.func,
  /** 스타일 변형 키(예: login, join 등) */
  inputChar: PropTypes.string,
  /** password 타입에서 보기/숨기기 토글 노출 여부 */
  toggleVisibility: PropTypes.bool,
  /** 사용 가능 여부 (false면 disabled) */
  inputAble: PropTypes.bool,
};

Input.defaultProps = {
  inputType: "text",
  inputPlaceholder: "",
  inputValue: "",
  inputLabel: "",
  setValue: undefined,
  inputChar: "",
  toggleVisibility: false,
  inputAble: true,
};
