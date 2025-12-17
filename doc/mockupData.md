
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



## 2. projectList 
- Swagger API 를 사용 필드명으로 매핑한 표입니다.

|api 필드		| 연결 필드명    | 타입     | 설명                                                          | 예시                                            |
| :-------------- 	| :-------------- | :----- | :---------------------------------------------------------- | :----------------------------------------- |
| writer		| writer          | string | 작성자 이름                                                      | `"홍길동"`                                       |
| workNo		| projectNo       | number | 프로젝트 번호                                                     | `84739`                                       |
| workRegdate	| projectDate     | string | 작성일 (YYYY-MM-DD)                                            | `"2025-08-06"`                                |
| projectCompany	| projectCompany  | string | 고객사 이름                                                      | `"NPLUS(네파)"`                                 |
| projectName	| projectBrand    | string | 브랜드명 (2차 분류)                                                | `"NEPA"`                                      |
| workCategory	| projectSort     | string | 프로젝트 분류 (기획전, 이벤트 등)                                        | `"외부몰"`                                       |
| workTitle		| projectTitle    | string | 프로젝트 제목                                                     | `"○ [키즈] WINTER VACANCE 다운 프리오더 (8/13~9/21)"` |
| (요청)		| projectTeam | string[] | 담당 팀명 배열  | `["DV", "SR"]` |
| workFileNew 	|  사용예정  | boolean | 새 파일 여부 (API: 0/1) | `false` |
| workCommentNew |  사용예정  | boolean | 새 댓글 여부 (API: 0/1) | `true` |
| (요청)		| projectStatus   | string | 상태값 (`receipt`, `progress`, `hold`, `completion`, `cancel`) | `"completion"`                                |

- 미사용/후보

| api 필드          | 타입     | 설명                                                  | 예시       |
| :-------------- | :----- | :-------------------------------------------------- | :------- |
| memberID        | string | 프로젝트 작성자  ID | `"company"` |
| projectNo       | number | 고객사 브랜드 고유 번호        | `326`    |
| clientCompanyNo | number | 고객사 고유 번호           | `186`    |
| workStatus	|  string | 프로젝트 진행 상태 (한글) | `"접수"` |
| workTeam	|  string | 담당 팀명 | `\"SR\"` |

** 개발팀 요청사항: 
1. workStatus 가 한글 라벨인데, 기존 라벨을 유지하고 영문 혹은 숫자 코드로 상태를 관리할 수 있는 필드를 추가적으로 내려주실 수 있나요?  
예: { workStatus: "접수", workStatusCode: "receipt" }
2. workTeam 이 현재 "\"SR\"" 형태로 내려오는데, 여러 팀이 가능하다면 배열 형태로 내려주실 수 있나요?  
예: { workTeam: ["SR","DV"] }



## 3. projectView  (임시 상세)
| api 필드		| 연결 필드명    | 타입     | 설명                                                          | 예시                                            |
| :-------------- | :-------------- | :----- | :---------------------------------------------------------- | :----------------------------------------- |
| 		| projectNo       | number | 프로젝트 번호                                                     | `84739`                                       |
| 		| projectDeadline | string | 마감일 (YYYY-MM-DD)                                            | `"2025-10-20"`                                |
| 		| projectContent  | string | 상세 내용                                                       | `"라이카 카메라 코리아 기획전 제작 요청드립니다."`                |
| 		| projectManager | string[] | 프로젝트 담당자 ID 목록  | `["test02", "test99"]` |




## 4. comments (임시 댓글 리스트)
| 필드명         | 타입                   | 설명                                               | 예시                           |
| :---------- | :------------------- | :----------------------------------------------- | :--------------------------- |
| `id`        | string               | 코멘트 구분을 위한 고유값              | `"0b03"`                     |
| `projectId` | string               | 코멘트가 속한 프로젝트의 ID                           | `"84750"`                    |
| `userId`    | string               | 코멘트를 작성한 사용자 ID (`userInfo`의 `id`)            | `"0"`                        |
| `text`      | string               | 코멘트 내용. 멘션 포함 시 @[홍길동](0) 형태로 저장  |                              |
| `file`      | boolean *(optional)* | 파일 첨부 여부 (`true`일 경우 `text`에 파일명 저장)            | `true`                       |
| `createdAt` | string               | 작성 시각 (ISO 8601 형식)                              | `"2025-11-04T08:20:08.203Z"` |



## 5. 멘션(테스트)
- 현재 /mock/db.json 에 userInfo 로 등록되어 있는 임시 사용자 리스트로 멘션 테스트가 가능합니다. 
- userCompany 값으로 회사별 사용자를 구분하고 있습니다. 

### 멘션에서 사용하는 데이터

| 필드명           | 타입     | 설명                   | 예시                        |
| :------------ | :----- | :------------------- | :------------------------ |
| `id`          | string | 유저 고유값               | `"0"`                     |
| `userName`    | string | 유저 이름                | `"홍길동"`                   |
| `userImage`   | string | 프로필 이미지 경로 (URL)     | `"/images/profile01.jpg"` | 
| `userCompany` | string | 소속 회사명               | `"NPLUS(네파)"`             |
| `userTeam`    | string | 스타일쉽: 소속팀 / 고객사: 브랜드 | `"CR"`, `"KEDS"`          |
| `jobTitle`    | string | 직급                   | `"과장"`                    |


### 멘션 가능 계정(예시)

| 회사        | 브랜드/팀 | 아이디    | 이름  |
| :-------- | :---- | :----- | :-- |
| 미스토코리아(주) | FILA  | test03 | 임꺽정 |
| 미스토코리아(주) | KEDS  | test05 | 김케즈 |
| 미스토코리아(주) | KEDS  | test09 | 케즈네 |
| 미스토코리아(주) | KEDS  | test10 | 테슽흐 |
| NPLUS(네파) |       | test01 | 홍길동 |
| NPLUS(네파) |       | test04 | 배고파 |
| STYLESHIP | CR    | test02 | 강아지 |
| STYLESHIP | UIX   | test06 | 고구마 |
| STYLESHIP | DV    | test07 | 바나나 |
| STYLESHIP | DV    | test99 | 관리자 |
| STYLESHIP | SR    | test11 | 스마트 |
| STYLESHIP | O2O   | test12 | 고양이 |



