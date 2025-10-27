# Alert Component

## 📖 개요
Alert 호출 시 사용되는 컴포넌트입니다.

---

## 💡 Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| `title` | `string` | `""` | Alert 창의 상단 타이틀 텍스트 |
| `children` | `string` | `undefined` | Alert 본문에 표시할 내용(태그 안에 입력시 props로 전달됨) |
| `alertType` | `boolean` | `true` | 버튼 구성 제어
true → 확인 / 취소 버튼 모두 표시
false → 확인 버튼만 표시 |

---

## 🧰 사용 예시

```jsx
import Alert from "@/components/common/Alert";
import { useState } from "react";

// alert on/off 관리를 위한 state
const [alertState, setAlertState] = useState('');
const handleAlertBtn = () => setAlertState((prev) => (prev === 'on' ? '' : 'on'));

return (<>
     <button onClick={handleAlertBtn}>알림 열기</button>

     <Alert title="알림" alertType={false}>
        {alertState === "on" ? "알림 내용입니다." : ""}
      </Alert>
</>)
```
