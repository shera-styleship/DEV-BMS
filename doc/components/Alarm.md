# Alarm Component

## 📖 개요
헤더 알람 버튼 클릭 시 노출되는 컴포넌트입니다.

---

## 💡 Props
AlarmItem에 위임

---

## 🧰 사용 예시

```jsx
import Alarm from "@/components/common/Alarm";

<Alarm />
```


<br><br>


# AlarmItem Component

## 📖 개요
헤더 알람 버튼 클릭 시 노출되는 알람 컴포넌트 속 항목 컴포넌트입니다.

---

## 💡 Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| `item` | `object` | `null` | 알림 데이터 객체. mockAlarms를 props로 받아와 정보 사용 |
| `onAlarmDelete` | `function` | `undefined` | 선택한 알림을 삭제하는 콜백 함수 |

key값은 리액트 내부에서만 사용하는 식별자로 props에 포함되지 않으나, 입력해야함.

---

## 🧰 사용 예시

```jsx
import AlarmItem from "@/components/common/AlarmItem";

<AlarmItem key={item.id} item={item} onAlarmDelete={onAlarmDelete} />;
```
