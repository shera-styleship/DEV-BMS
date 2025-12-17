# Checkbox Component

## 📖 개요
폼 입력이나 선택 기능을 구현할 때 사용하는 컴포넌트입니다.  

---

## 💡 Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| `checked` | `boolean` | `false` | 체크 상태 제어값 (true 시 체크 표시) |
| `onChange` | `function` | `() => {}` | 체크 상태 변경 시 호출되는 이벤트 핸들러 |
| `children` | `string` | `undefined` | 체크박스 라벨명(태그 안에 입력시 props로 전달됨) |

---

## 🧰 사용 예시

```jsx
import Checkbox from "@/components/common/Checkbox";
import { useState } from "react";

const Example = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <Checkbox
        checked={isChecked}
        onChange={handleCheckbox}
      >동의하기</Checkbox>
    </div>
  );
};

export default Example;
