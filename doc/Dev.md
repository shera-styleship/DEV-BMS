## 🧩 React 모듈 분리 가이드

### 📌 문서 목적

리액트 프로젝트의 모듈 구조와 역할을 명확히 정의하여,  
개발자 간의 일관된 코드 구조와 협업 효율을 높이기 위한 문서입니다.

### 🏗️ 프로젝트 개요

- **프로젝트명:** Styleship Bms Project
- **목적:** 스타일쉽 bms 리뉴얼
- **개발 스택:** React + Vite + React Router
- **버전 관리:** GitHub

### 폴더구조

```plaintext
src/
 ├── components/
 │    ├── common/        # 공용 컴포넌트 (Button, Input 등)
 │    ├── layout/        # 페이지 레이아웃 구성 요소 (Header, Lnb 등)
 │    ├── feature/       # 기능 단위 컴포넌트 (ProjectList, ProjectView 등)
 │    └── network        # IP 관리
 │
 ├── layouts/            # 페이지 분기점 
 ├── pages/              # 라우트 페이지 컴포넌트 
 ├── mock/               # 임시 데이터(JSON)
 ├── hooks/              # 커스텀 훅
 ├── utils/              # 유틸 함수, 상수, API
 ├── assets/             # 이미지, 아이콘, 스타일
```

### 컴포넌트/모듈 분리 기준

| 구분        | 설명                           | 예시                                 |
| ----------- | ------------------------------ | ------------------------------------ |
| **Common**  | 공통 UI 요소        | `Alert`, `Button`, `Input`, `Select`           |
| **Layout**  | 페이지 공통 구조               | `Header`, `Lnb` |
| **Feature** | 특정 기능 담당, 내부 상태 포함 | `ProjectList`, `ProjectView`, `ProjectFilterBar`, `ProjectItem`, `NewProject`    |
| **Utils**   | 순수 함수, API 모듈, 포맷터    | `constants`, `getUserImageSrc`            |
| **Hooks**   | 로직 재사용을 위한 커스텀 훅   |     |
| **Config**   | 설정 데이터  |  `filterBarOptions`  |


## 🗂️  doc/ - 내부 가이드
| 파일명 | 📝 설명 |
|:--|:--|
| [`API_Setting.md`](./API_Setting.md) | API 설정 가이드 |
| `Dev.md` | 프로젝트 개발 규칙 가이드 |
| [`Vercel_setting.md`](./Vercel_setting.md) | Vercel 배포 가이드 |
| [`mockupData.md`](./mockupData.md) | 목업데이터 가이드 |
| [`pages.md`](./pages.md) | 페이지 컴포넌트 가이드 |

#### 🔹 doc/components/ - 공용 컴포넌트 가이드
| 파일명 | 📝 설명 |
|:--|:--|
| [`Alarm.md`](./components/Alarm.md) | 알람 컴포넌트 가이드 |
| [`Alert.md`](./components/Alert.md) | 공용 알럿 컴포넌트 가이드 |
| [`Button.md`](./components/Button.md) | 공용 버튼 컴포넌트 가이드 |
| [`Input.md`](./components/Input.md) | 공용 인풋 컴포넌트 가이드 |
| [`Select.md`](./components/Select.md) | 공용 셀렉트 컴포넌트 가이드 |
| [`Checkbox.md`](./components/Checkbox.md) | 공용 체크박스 컴포넌트 가이드 |

## 📘 전체 모듈 및 파일 구조 설명

### 🗂️ 1. pages/ — 라우트 페이지 구성
| 파일명 | 📝 설명 |
|:--|:--|
| `Home.jsx` | 홈 페이지 |
| `Hr.jsx` | 인사 정보 페이지 |
| `Knowledge.jsx` | 사내 지식 페이지 |
| `Login.jsx` | 로그인 페이지 |
| `MyProject.jsx` | 나의 프로젝트 페이지 |
| `Project.jsx` | 프로젝트 페이지(리스트 + 상세 구성) |
| `Schedule.jsx` | 일정 관리 페이지 |
| `Setting.jsx` | 설정 페이지 |

### 🗂️ 2. layouts/ — 페이지 분기점
| 파일명 | 📝 설명 |
|:--|:--|
| `AuthLayout.jsx` | 로그인 레이아웃 |
| `AppLayout.jsx` | 로그인 이후 공통 레이아웃 (Header, Lnb 포함) |

### 🗂️ 3. components/
#### 🔹 components/common/
공용으로 재사용되는 기본 UI 요소들입니다.

| 파일명 | 📝 설명 |
|:--|:--|
| `Alarm.jsx` | 헤더 알람 노출 컴포넌트 |
| `AlarmItem.jsx` | 알람 컴포넌트 내 아이템 렌더링 |
| `Alert.jsx` | 알림/확인 레이어 컴포넌트 |
| `Button.jsx` | 기본 버튼 컴포넌트 |
| `Input.jsx` | 기본 인풋 컴포넌트 |
| `Select.jsx` | 커스텀 셀렉트 컴포넌트 |
| `Checkbox.jsx` | 체크박스 컴포넌트 |

#### 🔹 components/layout/
전체 페이지의 공통 구조 요소입니다.

| 파일명 | 📝 설명 |
|:--|:--|
| `Header.jsx` | 상단 헤더 |
| `Lnb.jsx` | 좌측 내비게이션 |

#### 🔹 components/feature/
특정 기능을 담당하는 기능 단위 컴포넌트입니다.

| 파일명 | 📝 설명 |
|:--|:--|
| `NewProject.jsx` | 새 프로젝트 등록 컴포넌트 |
| `ProjectList.jsx` | 프로젝트 리스트 렌더링 컴포넌트 |
| `ProjectFilterBar.jsx` | 프로젝트 리스트 내 필터링 기능 |
| `ProjectItem.jsx` | 프로젝트 리스트 내 아이템 렌더링 |
| `ProjectView.jsx` |  새프로젝트 생성/아이템 클릭 시 렌더링되는 프로젝트 상세 |
| `CommentTask.jsx` | 프로젝트 상세 하단 탭 내 코멘트 렌더링 |
| `FileTask.jsx` | 프로젝트 상세 하단 탭 내 파일 모아보기 렌더링 |
| `TimeTask.jsx` | 프로젝트 상세 하단 탭 내 작업 시간 렌더링 |
| `Mentions.jsx` | 멘션, react-mentions 라이브러리 사용 |
| `AssignManager.jsx` | 프로젝트별 작업위임(담당자) 등록 및 수정 컴포넌트 |

#### 🔹 components/network/
네트워크 관련 컴포넌트입니다.

| 파일명 | 📝 설명 |
|:--|:--|
| `PublicIP.jsx` | IP 조회 컴포넌트  |

### 🗂️ 4. utils/ - 유틸 함수 및 상수
| 파일명 | 📝 설명 |
|:--|:--|
| `constants.js` | 공용 상수 정의 |
| `getUserImageSrc.js` | 사용자 프로필 이미지 경로 반환 함수 |
| `env.js` | 환경설정 |
| `filterBarOptions.js` | 프로젝트 리스트 필터링 옵션(회사/브랜드) |

### 🗂️ 5. mock/ - 임시 데이터
| 파일명 | 📝 설명 |
|:--|:--|
| `db.json` | 테스트용 임시 데이터(JSON) 파일 |


