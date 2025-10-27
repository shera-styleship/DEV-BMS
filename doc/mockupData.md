
# 목업데이터

## 1. userInfo(임시 유저 데이터)

| 필드명          | 타입     | 설명               | 예시                        |
| :----------- | :----- | :--------------- | :------------------------ |
| id           | string | 유저 고유값 (DB 기본키)  | `"0"`                     |
| userId       | string | 로그인 아이디          | `"test01"`                |
| userPassword | string | 로그인 비밀번호         | `"1234"`                  |
| userName     | string | 유저 이름            | `"홍길동"`                   |
| userImage    | string | 프로필 이미지 경로 (URL) | `"/images/profile01.jpg"` |
| userPhone    | string | 전화번호             | `"010-0000-0000"`         |
| userCompany  | string | 소속 회사명           | `"NPLUS(네파)"`             |
| jobTitle     | string | 직급               | `"과장"`                    |

<br>

## 2. projectList (임시 프로젝트 리스트)
| 필드명             | 타입     | 설명                                                          | 예시                                            |
| :-------------- | :----- | :---------------------------------------------------------- | :-------------------------------------------- |
| id              | string | 프로젝트 고유 ID                                                  | `"0"`                                         |
| writer          | string | 작성자 이름                                                      | `"홍길동"`                                       |
| projectNo       | number | 프로젝트 번호                                                     | `84739`                                       |
| projectDate     | string | 작성일 (YYYY-MM-DD)                                            | `"2025-08-06"`                                |
| projectCompany  | string | 고객사 이름                                                      | `"NPLUS(네파)"`                                 |
| projectBrand    | string | 브랜드명 (2차 분류)                                                | `"NEPA"`                                      |
| projectSort     | string | 프로젝트 분류 (기획전, 이벤트 등)                                        | `"외부몰"`                                       |
| projectTitle    | string | 프로젝트 제목                                                     | `"○ [키즈] WINTER VACANCE 다운 프리오더 (8/13~9/21)"` |
| projectStatus   | string | 상태값 (`receipt`, `progress`, `hold`, `completion`, `cancel`) | `"completion"`                                |
| projectDeadline | string | 마감일 (YYYY-MM-DD)                                            | `"2025-10-20"`                                |
| projectContent  | string | 상세 내용                                                       | `"라이카 카메라 코리아 기획전 제작 요청드립니다."`                |
| projectTeam     | string | 담당 팀명                                                       | `"SR"`                                        |

<br>

## 3. mockAlarms (임시 알림 리스트)
| 필드명              | 타입                   | 설명                                  | 예시                                               |
| :--------------- | :------------------- | :---------------------------------- | :----------------------------------------------- |
| `id`             | number               | 각 알림을 구분하기 위한 고유값                   | `1`                                              |
| `projectName`    | string               | 관련 프로젝트명 또는 제목                      | `"○ 8월 수배송 공지"`                                  |
| `projectCompany` | string               | 고객사명 또는 브랜드명                        | `"NPLUS(네파)"`                                    |
| `writer`         | string               | 알림을 생성한 작성자 이름                      | `"홍길동"`                                          |
| `message`        | string               | 알림 본문 내용                            | `"수배송 공지 시안 제작 부탁드립니다~! 시안 확정 시 psd 공유 부탁드립니다."` |
| `createdAt`      | string               | 알림 생성 시각 (ISO 8601 형식, KST 포함)      | `"2025-10-24T09:34:00+09:00"`                    |
| `deleted`        | boolean *(optional)* | 삭제 여부 (`true`: 삭제됨, `false`: 활성 상태) | `false`                                          |
