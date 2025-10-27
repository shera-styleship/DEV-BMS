# 🧩 Select Component

## 📖 개요
공용 커스텀 셀렉트 박스 컴포넌트.\
기본 `<select>`  대신 UI 커스터마이징이 가능하도록 제작되었음.\
선택된 `value`가 표시되는 버튼과 옵션 리스트로 구성되어 있음.

---

## 💡 Props

| Prop | Type | Default | Description | 
|------|------|----------|-------------| 
| name | string |  | 폼 데이터 전송 시 구분용 name 값 | 
| value | string |  | 현재 선택된 옵션의 value | 
| options | array |  | {value, label} 형태의 옵션 리스트 | 
| onChange | function |  | 옵션 선택시 상위 상태 업데이트 | 
| className | string |  | 추가 스타일링용 클래스명 |

---

## 🧰 구조 및 동작

```jsx

<div
  ref={wrapperRef}
  className={`CustomSelect ${className} ${isOpen ? "open" : ""}`}
>
  <button
    type="button"
    className={`select-display ${value ? "selected" : ""}`}
    onClick={() => setIsOpen((prev) => !prev)}
  >
    {selectedOption.label}
  </button>

  {isOpen && (
    <ul className="select-options">
      {options.map((opt) => (
        <li
          key={opt.value}
          className={`_${opt.value} ${opt.value === value ? "active" : ""}`}
          onClick={() => handleSelect(opt.value)}
        >
          {opt.label}
        </li>
      ))}
    </ul>
  )}
</div>
```

-   `isOpen` 상태값에 따라 `.CustomSelect.open` 클래스가 적용되어
    옵션박스 표시
-   선택된 값이 있을 경우 `.select-display.selected` 클래스가 추가됨

### 🧰 기본 사용 예시

``` jsx
import { Select } from "@/components/Select";

{selectOptions.map(({ name, options }) => (
  <Select
    key={name}
    name={name}
    value={filters[name]}
    options={options}
    onChange={handleSelect}
    className={`_${name}`}
  />
))}
```

### 🧰 프로젝트 진행 상태 셀렉트

``` js
// utils/constants.js
export const PROJECT_STATUS_OPTIONS = [
  { value: "receipt", label: "접수" },
  { value: "progress", label: "진행" },
  { value: "hold", label: "보류" },
  { value: "completion", label: "완료" },
  { value: "cancel", label: "취소" }
];
```

``` jsx
import { PROJECT_STATUS_OPTIONS } from "@/utils/constants";

<Select 
  name="status"
  value={status}
  options={PROJECT_STATUS_OPTIONS}
  onChange={handleStatusChange}
  className={`_status _${status}`}
/>
```
-   `_staus` 추가 스타일링. 


