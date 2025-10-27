## API Setting
API 환경 변수 설정 방법

**1. 깃허브에 json 추가**

공개 레포를 mock-api 로 생성 (테스트용)

<img width="795" height="784" alt="Image" src="https://github.com/user-attachments/assets/89d75497-2cd0-4e36-be3f-2dd2c68736dc" />


생성 후 mock-api 안에 db.json 파일 추가

기존에 사용하던 db.json 넣어주면 됨.

<img width="1131" height="429" alt="Image" src="https://github.com/user-attachments/assets/34c130e4-2f0b-47d1-81e1-b669a279c4db" />


**2. 파일 생성**
프로젝트 폴더 바로 아래 파일 생성
>.env (공통)
>
>.env.development (개발용)
>
>.env.production (배포용)
>
>/utils/env.js (환경변수 불러오는 용도)

>예)
>
>BMS/.env
>
>BMS/.env.development
>
>BMS/.env.production
>
<img width="308" height="730" alt="Image" src="https://github.com/user-attachments/assets/8df2afc4-48c2-40c5-8b1a-b22ccc759790" />


**3. 코드 입력**
.env (공통)

    VITE_APP_NAME=MyReactApp // 에러 방지


.env.development (개발용)

    // VITE_API_BASE : 여기만 바꾸면 전체적으로 다 바뀜
    
    VITE_API_BASE=http://localhost:4000 // 개발용
    VITE_LOG_LEVEL=debug

.env.production (배포용)

    // VITE_API_BASE : 여기만 바꾸면 전체적으로 다 바뀜
    // https://my-json-server.typicode.com/<깃허브ID>/mock-api
    
    VITE_API_BASE=https://my-json-server.typicode.com/kjssong/mock-api // 배포용
    VITE_LOG_LEVEL=error

/utils/env.js

    // 리액트에서 자동으로 개발용, 배포용 구분해줌
    export  const  API_BASE  =  import.meta.env.VITE_API_BASE;
    export  const  LOG_LEVEL  =  import.meta.env.VITE_LOG_LEVEL;
    export  const  APP_NAME  =  import.meta.env.VITE_APP_NAME;



**4. API 불러오기**


    // 파일 제일 위 어딘가( import 아래 )
    // BMS 기준 App.jsx, Project.jsx
    
    import { API_BASE } from  "@/utils/env";
    
    const  res  =  await  fetch(`${API_BASE}/userInfo`);

<img width="750" height="347" alt="Image" src="https://github.com/user-attachments/assets/b5c7ddaa-a003-4505-b826-81693bd1ad69" />
<img width="594" height="307" alt="Image" src="https://github.com/user-attachments/assets/5a8c1434-034c-4c93-bc42-c939cae04853" />
