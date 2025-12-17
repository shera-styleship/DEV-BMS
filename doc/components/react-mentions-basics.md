
# 📚 react-mentions 기본 문서 (설치 · 사용법 · 스타일링 · 팁)

`react-mentions`는 텍스트 입력에서 **@멘션**, **#해시태그**, `:emoji:` 등 다양한 트리거를 통해
자동완성(suggestions)을 제공하는 컴포넌트입니다. 핵심은 **`MentionsInput`**(입력 컨테이너)과
그 안에 **`Mention`**(각 트리거/데이터 소스)을 자식으로 배치하는 구조예요. citeturn0search0

---

## 1) 설치

```bash
# npm
npm i react-mentions

# yarn
yarn add react-mentions

# pnpm
pnpm add react-mentions
```

타입스크립트 사용 시, 최근 버전들은 자체 타입을 포함하는 경우가 많지만
프로젝트 세팅에 따라 `@types/react-mentions`가 필요할 수 있습니다. 주요 prop 시그니처는 타입 정의 파일에서 확인할 수 있어요. citeturn0search23

---

## 2) 가장 단순한 예제

```tsx
import { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";

export default function Basic() {
  const [value, setValue] = useState("");

  const users = [
    { id: "1", display: "홍길동" },
    { id: "2", display: "김영희" },
  ];

  return (
    <MentionsInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      singleLine={false}                 // false면 <textarea> 렌더링
      placeholder="@을 입력하세요"
    >
      <Mention
        trigger="@"
        data={users}                      // 배열 또는 함수(비동기 공급자)
        markup="@[__display__](__id__)"   // 저장 포맷
        displayTransform={(_, d) => `@${d}`} // 화면 표시
      />
    </MentionsInput>
  );
}
```

- `MentionsInput`는 입력 컴포넌트(텍스트/textarea)이며,
  **여러 개의 `Mention` 자식**을 가질 수 있습니다(예: `@user`, `#tag`, `:emoji:`를 각각 별도 `Mention`으로). citeturn0search0

---

## 3) 데이터 공급자(data) — 배열 · 동기 함수 · 비동기 함수

```tsx
// 배열
<Mention trigger="@" data={[{ id:"1", display:"홍길동" }]} />

// 동기 함수
<Mention trigger="@" data={(query, cb) => cb(filteredArray)} />

// 비동기 함수(서버 요청)
<Mention
  trigger="@"
  data={async (query, cb) => {
    const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
    const arr = await res.json();
    cb(arr); // [{ id, display }, ...] 형태
  }}
/>
```

- `data`에 **함수**를 쓰면 검색어마다 서버에서 **비동기 검색**을 수행해 최신 목록을 보여줄 수 있어요. citeturn0search24turn0search17

---

## 4) 주요 Props 요약

### MentionsInput (주요)
- **`value` / `onChange`**: **Controlled input**으로 사용 권장.
- **`singleLine`**: `true`면 `<input type="text">`, `false`면 `<textarea>`.
- **`className` / `style`**: 루트 및 내부 레이어에 스타일 적용. (하위 키: `control`, `highlighter`, `input`, `suggestions` 등 substyle) citeturn0search0
- **`inputRef`**: 내부 input/textarea dom ref 제어.
- **`allowSuggestionsAboveCursor`**: 커서 위/아래 배치 허용. citeturn0search6
- **`suggestionsPortalHost`**: **제안 리스트를 별도 DOM**에 렌더(overflow/z-index 문제 회피). citeturn0search0

### Mention (주요)
- **`trigger`**: `@`, `#`, `:`, `/\w+/` 등 트리거. 여러 개의 `Mention` 가능. citeturn0search6
- **`data`**: 배열/함수/비동기 함수로 **제안 데이터 공급**.
- **`markup`**: 저장 포맷(예: `@[__display__](__id__)`). citeturn0search0
- **`displayTransform`**: 입력 내 **표시용 텍스트** 변경. (예: `@홍길동`) citeturn0search14
- **`renderSuggestion`**: 제안 아이템 커스텀 렌더링(아바타/서브텍스트 등). citeturn0search24
- **`appendSpaceOnAdd`**: 선택 후 공백 자동 추가.
- **`className` / `style`**: 토큰(멘션된 단어) 하이라이트 스타일 지정. citeturn0search0

---

## 5) 여러 트리거를 동시에 사용하기

```tsx
<MentionsInput value={value} onChange={...}>
  {/* @user */}
  <Mention trigger="@" data={userProvider} />

  {/* #tag */}
  <Mention trigger="#" data={tagProvider} />

  {/* :emoji: */}
  <Mention trigger=":" data={emojiProvider} />
</MentionsInput>
```

- 각 `Mention`은 **독립된 데이터 소스와 렌더 규칙**을 가질 수 있습니다. citeturn0search6

---

## 6) 스타일링 전략 (핵심 클래스)

기본 DOM 구조에는 다음 클래스들이 붙습니다. (필요 시 오버라이드)

| 클래스 | 설명 |
|---|---|
| `.mentions__control` | 전체 컨테이너 |
| `.mentions__highlighter` | 하이라이트 레이어 (겹쳐 보이는 투명 텍스트) |
| `.mentions__input` | 실제 입력(`input/textarea`) |
| `.mentions__suggestions__list` | 제안 `<ul>` |
| `.mentions__suggestions__item` | 제안 `<li>` (포커스 시 `--focused`) |

```css
/* 예시: 토큰(멘션된 단어)의 배경/색상 */
.mentions__highlighter strong { background: #eaf5ff; }

/* 제안 리스트 */
.mentions__suggestions__list { max-height: 320px; overflow: auto; }
.mentions__suggestions__item--focused { background: #eaf5ff; }
```

- 토큰/강조는 **하이라이터 레이어**에 렌더되므로 해당 계층을 타겟팅해서 색상을 주는 패턴이 일반적입니다. citeturn0search2turn0search10

> **z-index 주의**: z-index가 먹지 않는다면 오타(`zInex`) 또는 `position: static` 때문인 경우가 많습니다.
> 부모의 `overflow: hidden/auto`가 제안창을 자르기도 하므로, 이럴 땐 `suggestionsPortalHost`로 **포털 렌더링**하세요. citeturn0search13

---

## 7) 마크업/표시 포맷

```tsx
<Mention
  trigger="@"
  markup="@[__display__](__id__)"          // 저장 포맷(데이터베이스 저장 등)
  displayTransform={(id, display) => `@${display}`} // 화면 표시
/>
```

- 저장 포맷은 **머신 친화적**(id 포함), 표시 포맷은 **사람 친화적**으로 분리하는게 일반적입니다. citeturn0search0turn0search14

---

## 8) 비동기 서버 검색(권장 패턴)

```tsx
<Mention
  trigger="@"
  data={async (query, cb) => {
    const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
    const rows = await res.json();
    // 서버 응답을 [{ id, display }, ...] 형태로 변환
    const mapped = rows.map((u) => ({ id: String(u.id), display: u.name }));
    cb(mapped);
  }}
  renderSuggestion={(entry) => (
    <div style={{ display: "flex", gap: 8 }}>
      <img src={entry.avatar} width="20" height="20" />
      <div>
        <div>{entry.display}</div>
        <small style={{ color: "#6b7280" }}>{entry.team} {entry.title}</small>
      </div>
    </div>
  )}
/>
```

- 대용량 데이터는 **서버 페이징**/쿼리 캐시를 함께 고려하세요. citeturn0search24

---

## 9) 흔한 문제와 해결책

| 문제 | 원인 | 해결 |
|---|---|---|
| 제안창이 부모 박스에 잘림 | 부모가 `overflow:hidden/auto` | `suggestionsPortalHost`로 포털 렌더 |
| z-index가 적용 안 됨 | `position: static` 또는 오타 | `position: relative` 등으로 스택 컨텍스트 지정 |
| 제안창 위치 제어가 필요 | 커서 아래로 뜨는 기본 동작 | `allowSuggestionsAboveCursor` 사용 |
| 멘션 토큰 스타일이 안 먹음 | 하이라이터 레이어 이해 부족 | `.mentions__highlighter` 계층 타겟팅 |

관련 이슈/논의: 오버플로우로 인한 컷오프, 제안 위치 조정 등. citeturn0search13turn0search5

---

## 10) 추가 리소스

- GitHub(공식 README, 예제, props): citeturn0search0  
- 데모 페이지(다중 트리거, 샘플): citeturn0search6  
- 기사/튜토리얼(비동기, 폼): citeturn0search24turn0search17

---

### ✅ 요약
- `MentionsInput` + 여러 `Mention` 조합으로 멘션/해시태그/이모지 등 구현
- `data`는 **배열/함수/비동기** 모두 가능 → 서버 검색에 적합
- 스타일은 **하이라이터/입력/제안** 레이어를 이해하고 z-index/overflow 이슈에 유의
- 저장 포맷(`markup`)과 화면 표시(`displayTransform`)을 분리해서 사용
