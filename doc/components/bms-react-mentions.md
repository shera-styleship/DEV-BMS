
# 🧩 React Mentions 컴포넌트 주석 가이드

이 문서는 제공한 **`Mentions.jsx`** 코드에 달린 주석을 중심으로  
각 부분이 어떤 역할을 하는지, 수정/확장 시 주의할 점을 정리한 마크다운 버전입니다.

---

## 📦 1. 파일 개요

| 구분 | 내용 |
|------|------|
| 주요 라이브러리 | `react-mentions` |
| 핵심 컴포넌트 | `MentionsInput`, `Mention` |
| 입력 포맷 | `@[__display__](__id__)` → 예: `@[홍길동](123)` |
| 포털 사용 | `suggestionsPortalHost` 로 별도 DOM에 제안 목록 렌더링 |
| 렌더 모드 | `singleLine={false}` → `<textarea>` 기반 입력 |

---

## 🧠 2. 주요 로직 흐름

1. API에서 사용자 목록(`userInfo`) 불러오기  
2. 현재 로그인한 사용자(`currentUser`) 기준으로 **멘션 가능한 대상 필터링**
3. 회사별로 정렬 + 그룹화 → `isFirstOfGroup` 플래그 설정
4. `dataProvider()`가 react-mentions에 데이터 전달
5. `renderSuggestion()`에서 사용자 항목을 커스텀 렌더링

---

## ⚙️ 3. 주요 상태 변수

| 변수명 | 설명 |
|--------|------|
| `value` | 현재 입력 중인 텍스트 (react-mentions가 관리) |
| `userData` | 서버에서 불러온 사용자 원본 배열 |
| `portalRef` | 제안 목록을 렌더링할 별도 DOM 참조 |
| `currentUser` | 로그인 중인 사용자 정보 (권한/회사 포함) |

---

## 🧩 4. 주요 함수 설명

### `normalizeCompany(c)`
회사명을 비교용으로 정리합니다.  
- 공백 제거, 소문자 변환, 별칭 통합 등

### `canMention(viewer, target)`
멘션 가능한 상대를 필터링합니다.  
- ADMIN → 모두 가능  
- USER → 같은 회사 or STYLESHIP 관련이면 가능  
- 자기 자신은 제외

### `buildGrouped(query)`
검색어에 맞게 사용자 목록을 필터링 후 회사별로 정렬 및 그룹 구분.  
- 그룹 첫 항목에만 `isFirstOfGroup: true` 설정

### `dataProvider(query, callback)`
react-mentions의 자동완성 데이터를 공급하는 함수.  
- `callback()`으로 최종 필터링된 배열을 전달합니다.

---

## 🎨 5. 스타일 관련 핵심 포인트

| 요소 | 역할 | 설명 |
|------|------|------|
| `highlighter` | 하이라이트 레이어 | z-index 3으로 겹침 제어 |
| `input` | 실제 입력 `<textarea>` | z-index, background 제어 |
| `portalRef` | 포털 DOM | 부모 overflow에 잘리지 않게 별도 렌더 |

```tsx
const styles = {
  highlighter: { zIndex: 3, pointerEvents: "none" },
};
```

> 🧩 `zInex` → `zIndex` 오타 주의!  
> 반드시 `position` 속성이 있어야 `z-index`가 적용됩니다.

---

## 👥 6. `renderSuggestion` 내부 구조

```tsx
<div>
  {entry.isFirstOfGroup && <div>회사명 헤더</div>}
  <div className="mentions__suggestions__row">
    <img src={entry.avatar} />
    <div>
      <div>이름</div>
      <small>{entry.team} {entry.title}</small>
    </div>
  </div>
</div>
```

| 구분 | 역할 |
|------|------|
| `isFirstOfGroup` | 그룹 헤더(회사명) 표시용 |
| `focused` | 현재 선택 중인 항목 강조 배경 |
| `entry.team` `entry.title` | 직급/부서 표시용 |

---

## 💬 7. 입력창 내부 Mentions 토큰 스타일

```tsx
<Mention
  style={{
    backgroundColor: "rgb(248,248,248)",
    borderRadius: 4,
    fontWeight: "700",
    color: "rgb(0,0,0)",
  }}
  appendSpaceOnAdd
/>
```

- Mentions 토큰의 배경과 글씨 색상 지정 가능  
- `appendSpaceOnAdd` 옵션으로 멘션 선택 후 자동으로 공백 추가

---

## 🧱 8. 포털 렌더링 구조

```tsx
<div ref={portalRef} />
```
자동완성 리스트(`suggestions`)는 이 DOM에 렌더링됩니다.  
부모 컨테이너의 `overflow: hidden`에 잘리지 않게 하기 위한 처리입니다.

---

## 🧭 9. 코드 실행 순서 요약

1️⃣ API 요청 → 사용자 목록 세팅  
2️⃣ 권한에 따라 필터링  
3️⃣ `buildGrouped()`로 정렬 및 그룹화  
4️⃣ `dataProvider()`가 react-mentions에 데이터 공급  
5️⃣ `renderSuggestion()`으로 UI 렌더링  
6️⃣ 입력창 내부에서 멘션 선택 시 토큰으로 삽입

---


