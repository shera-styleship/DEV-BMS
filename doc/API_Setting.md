## API Setting
읽기만 가능


**1. Json을 불러오던 컴포넌트 파일을 열어 import 아래에 내용 추가**

https://my-json-server.typicode.com/<깃허브ID>/<레포이름>

    // 파일 제일 위 어딘가( import 아래 )
    // BMS 기준 App.jsx, Project.jsx
    
    const API_BASE = import.meta.env.PROD
      ? "https://my-json-server.typicode.com/kjssong/mock-api"
      : "http://localhost:4000";

<img width="637" height="398" alt="Image" src="https://github.com/user-attachments/assets/dd92aad2-1867-4f08-a697-1cb91c361022" />


**2. fectch() 경로 변경**

기존

    const res = await fetch("http://localhost:4000/userInfo");

변경

    const res = await fetch(`${API_BASE}/userInfo`);

<img width="1259" height="438" alt="Image" src="https://github.com/user-attachments/assets/5c0a132f-ea47-4233-ae57-253b5318fe87" />



**3. 깃허브에 json 추가**

공개 레포를 mock-api 로 생성

<img width="795" height="784" alt="Image" src="https://github.com/user-attachments/assets/89d75497-2cd0-4e36-be3f-2dd2c68736dc" />


생성 후 mock-api 안에 db.json 파일 추가

기존에 사용하던 db.json 넣어주면 됨.

<img width="1131" height="429" alt="Image" src="https://github.com/user-attachments/assets/34c130e4-2f0b-47d1-81e1-b669a279c4db" />
