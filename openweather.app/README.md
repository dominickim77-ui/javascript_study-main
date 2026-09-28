# OpenWeather 날씨 조회 실습

OpenWeather API와 Node.js를 이용한 날씨 조회 실습입니다.

## 실행 방법

1. Node.js를 설치합니다.

2. 필요한 패키지를 설치합니다.

   npm install

3. `.env.example`을 참고하여 `.env` 파일을 만듭니다.

4. `.env` 파일에 자신의 OpenWeather API Key를 입력합니다.

   OPENWEATHER_API_KEY=YOUR_API_KEY

5. 서버를 실행합니다.

   node server.js

6. 브라우저에서 아래 주소로 접속합니다.

   http://localhost:3000

## API Key 보안

실제 API Key가 들어 있는 `.env` 파일은 `.gitignore`에 의해 GitHub에 업로드되지 않습니다.

브라우저는 OpenWeather API를 직접 호출하지 않고 Node.js 서버의 `/api/weather`를 호출합니다.

브라우저 → Node.js 서버 → OpenWeather API
