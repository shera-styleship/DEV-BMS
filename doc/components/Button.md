# 🧩 Button Component

## 📖 개요
공용 커스텀 버튼 컴포넌트.\
크기(`btnSize`)와 색상(`btnChar`)을 조합하여 다양한 스타일을 적용할 수 있음.\
버튼 타입(`button`, `submit`, `reset`) 지정이 가능함.

---

## 💡 Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| `children` | `node` | `"Button"` | 버튼 안에 들어갈 내용(텍스트 또는 노드) |
| `onClick` | `function`  | `undefined` | 클릭 시 실행되는 이벤트 핸들러 |
| `btnSize` | `"small" "middle" "big"` | `"big"` | 버튼 크기 |
| `btnChar` | `"orange" "white"` | `"orange"` | 버튼 색상 테마 |
| `btnType` | `"button" "submit" "reset"` | `"button"` | 버튼 타입 |

---

## 🧰 구조 및 동작

```jsx
<button
  type={btnType}
  onClick={onClick}
  className={`Button Button_${btnSize} Button_${btnChar}`}
>
  {children}
</button>

```

### 🧰 기본 사용 예시
``` jsx
import Button from "@/components/common/Button";

<Button onClick={() => alert("Clicked!")}>확인</Button>

<Button btnSize="small" btnChar="white">
  취소
</Button>

<Button btnSize="middle" btnChar="orange" btnType="submit">
  저장
</Button>
```



