# BMS

```html
전체 다운로드 하고, 터미널에서 
npm install
npm run dev
```

```html
터미널 1개 더 열어서
npm i -g json-server
json-server --watch src/mock/db.json --port 4000
```



**테스트 아이디**
 - test01/1234 
 - test02/5678 (소속 styleship) 
 - test03/0000



## StoryBook 설치 및 사용 방법

**설치 및 실행**

    npx storybook@latest init
    npm run storybook

**실행 화면**
<img width="1067" height="699" alt="Image" src="https://github.com/user-attachments/assets/d8e16c51-aac1-49cf-8c14-7deebb0eed15" />


1. 컴포넌트 등록

: +버튼 클릭 후 나오는 레이어에 원하는 컴포넌트 검색 후 클릭

<img width="1067" height="699" alt="Image" src="https://github.com/user-attachments/assets/73151220-d335-467d-9368-4d9a073f9c5b" />

<img width="633" height="332" alt="Image" src="https://github.com/user-attachments/assets/7008a5dd-f3a4-4fc1-8acc-4f389ced257d" />

2. 에디터에서 생성된 파일을 열어 내용 수정

: 파일명.stories.jsx 파일을 열어 내용 수정
<img width="1060" height="683" alt="Image" src="https://github.com/user-attachments/assets/c0e6eecf-8451-44b8-b5f2-67dda2e80b0c" />

4. 내용 수정 후 다시 스토리북으로 가서 생성된 탭 확인

: Docs 탭 안에 있는 내용은 
파일명.jsx 안에 프롭타입을 추가해주고 주석을 넣으면 자동으로 문서화 해줌.
<img width="954" height="805" alt="Image" src="https://github.com/user-attachments/assets/5b416e59-2fa5-4a38-b674-eeacb5803569" />
<img width="531" height="684" alt="Image" src="https://github.com/user-attachments/assets/332a331b-2e56-489e-826d-2120da71b33d" />




**빌드하고 웹에서 볼 수도 있음**

: https://kjssong.github.io/SSUI/?path=/docs/components-form-button--docs




