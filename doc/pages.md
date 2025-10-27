# 1. /src/pages/Login.jsx
- 페이지 목적: 유저 아이디와 비밀번호를 입력받아 로그인 검증 및 전역 로그인 처리 / 로그인 성공 시 메인 페이지로 이동
- 현재 상태: `db.json` 내 `userInfo` mock data 기반으로 로그인 테스트 중
- 주요 기능:
  1. **아이디 저장 기능**
       - 체크박스 선택 시 localStorage에 userId 저장
       - 다음 접속 시 자동으로 input에 복원
  2. **입력 검증 및 Alert 호출**
       - 아이디/비밀번호 입력 여부에 따라 커스텀 `Alert` 호출
  3. **오류 처리**
       - 실패 시 `Alert`로 오류 메시지 표시 (예: “비밀번호가 일치하지 않습니다.”)
  4. **비밀번호 토글 기능**
       - `Input` 컴포넌트 내 `toggleVisibility` props로 구현
  5. **로그인 검증**
       - mock data(`userInfo`)에서 `userId`와 `userPassword` 매칭
       - 일치 시 전역 로그인 함수 `login(user.id)` 실행
       - 로그인 성공 시 `useNavigate`로 `/` 경로 이동
 

# 2. /src/components/layout/Header.jsx
- 목적: 로그인한 유저의 정보를 표시하고, 회사 구분에 따라 UI 및 출석체크 기능 제공
- 현재 상태 : mock data 기반 헤더 분리
- 주요 기능:
  1. 유저 정보 표시
  2. 출근체크 기능 (Styleship 소속 유저 한정)
- 표시 데이터 구조 :
  1. userImage(string)
  2. userName(string)

# 3. /src/pages/Project.jsx
- 목적: 프로젝트 목록/조회 페이지로 좌측 리스트에서 선택하면 프로젝트 내용이 우측에 표시됨
- 현재 상태: 리스트 선택 시 우측에 상세 내용이 URL 파라미터(:projectNo)로 구분되어 노출
- 주요 기능:
  1. **프로젝트 리스트 불러오기**
     - fetchProjects
  2. **로딩이 정상적으로 이뤄지지 않았을 경우 'Loading...' 노출**
  3. **프로젝트 상세 보기**
   - 선택 시 projectNo를 통해 내용을 구분하고, URL 파라미터로 페이지 url을 통해서 접근도 가능
  4. **다시 불러오기** 
   - 프로젝트 등록 등으로 projectRefresh 값이 바뀌면 리스트 새로고침