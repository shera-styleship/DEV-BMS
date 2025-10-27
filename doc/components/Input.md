# 🧩 Input Component

## 📖 개요

공용 인풋(Input) 컴포넌트.`type`에 따라 다양한 입력 필드 지원함.\
`password` 타입일 때는 보기/숨기기 토글 버튼 제공.\
`file` 타입일 경우, value를 직접 제어하지 않고 `onChange`로 파일 객체 반환함.

------------------------------------------------------------------------
## 💡 Props
| Prop | Type | Default | Description |
|------|------|----------|-------------|
| `inputType` | `"text" "password" "email" "number" "file" "tel" "url" "search" "date" "time" "datetime-local" "color"` | `"text"` | input의 타입 |
| `inputPlaceholder` | `string` | `""` | placeholder 텍스트 |
| `inputValue` | `string` \| `number` | `""` | 입력 값 (Controlled 컴포넌트). `file` 타입에서는 무시됨 |
| `inputLabel` | `string` | `""` | 라벨 텍스트 |
| `setValue` | `function` | `undefined` | 값 변경 시 부모 state에 전달할 setter 함수 |
| `inputChar` | `string` | `""` | 스타일 변형용 키값 (예: `"login"`, `"join"` 등) |
| `toggleVisibility` | `boolean` | `false` | `password` 타입일 때 보기/숨기기 버튼 노출 여부 |
| `inputAble` | `boolean` | `true` | 사용 가능 여부 (`false`면 `disabled`) |

------------------------------------------------------------------------

## 🧰 구조 및 동작

``` jsx
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
```

-   `password` 타입 + `toggleVisibility=true`일 때 보기/숨기기 토글
    표시
-   `file` 타입일 경우 `value` 속성을 넘기지 않음 (브라우저 제한)
-   `inputAble=false`일 경우 비활성화 처리 가능

------------------------------------------------------------------------

## 🧰 기본 사용 예시

``` jsx
import Input from "@/components/common/Input";

// 텍스트 
<Input
  inputLabel="이름"
  inputPlaceholder="이름을 입력하세요"
  inputValue={name}
  setValue={setName}
/>

// 비밀번호 (보기/숨기기 토글)
<Input
  inputLabel="비밀번호"
  inputType="password"
  inputPlaceholder="비밀번호를 입력하세요"
  inputValue={password}
  setValue={setPassword}
  toggleVisibility={true}
/>

// 파일 업로드
<Input
  inputLabel="첨부파일"
  inputType="file"
  setValue={setFile}
/>
```
