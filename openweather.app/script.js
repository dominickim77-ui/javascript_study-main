// 도시별 좌표 목록 (Open-Meteo 무료 API)
const CITIES = {
  seoul: { name: '서울 (Seoul)', lat: 37.5665, lon: 126.9780 },
  busan: { name: '부산 (Busan)', lat: 35.1796, lon: 129.0756 },
  daegu: { name: '대구 (Daegu)', lat: 35.8714, lon: 128.6014 },
  incheon: { name: '인천 (Incheon)', lat: 37.4563, lon: 126.7052 },
  gwangju: { name: '광주 (Gwangju)', lat: 35.1595, lon: 126.8526 }
};

const logBox = document.getElementById('logBox');
const resultCard = document.getElementById('resultCard');
const cityNameEl = document.getElementById('cityName');
const cityTempEl = document.getElementById('cityTemp');
const cityExtraEl = document.getElementById('cityExtra');

function log(msg) {
  const time = new Date().toLocaleTimeString();
  logBox.textContent += `\n[${time}] ${msg}`;
  logBox.scrollTop = logBox.scrollHeight;
}

function clearLog() {
  logBox.textContent = '> 콘솔이 초기화되었습니다.';
}

// 버튼 클릭 이벤트
document.getElementById('btnFetch').addEventListener('click', () => {
  const cityKey = document.getElementById('citySelect').value;
  const target = CITIES[cityKey];
  const API_KEY = 'YOUR_API_KEY';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${target.lat}&lon=${target.lon}&appid=${API_KEY}&units=metric`;

  log(`1. fetch() 주문서 발송: ${target.name}`);
  resultCard.classList.add('d-none');

  // ==========================================================
  // [핵심] 오직 fetch와 .then() 체인만 사용하는 기본 문법
  // ==========================================================
  fetch(url)
    .then((response) => {
      log(`2. 서버 응답 도착 (HTTP 상태 코드: ${response.status})`);
      if (!response.ok) {
        throw new Error(`HTTP 에러 발생: ${response.status}`);
      }
      // 응답 본문을 JSON 객체로 파싱하여 다음 then으로 전달
      return response.json();
    })
    .then((data) => {

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    log(`3. JSON 변환 완료! 기온: ${temp}°C / 습도: ${humidity}%`);

    // 화면에 표시
    cityNameEl.textContent = target.name;
    cityTempEl.textContent = `${temp} °C`;
    cityExtraEl.textContent = `습도: ${humidity}% | 풍속: ${windSpeed} m/s`;

    resultCard.classList.remove('d-none');
    })
    .catch((error) => {
      log(`❌ 에러 발생: ${error.message}`);
      alert(`날씨 정보를 가져오지 못했습니다: ${error.message}`);
    })
    .finally(() => {
      log(`4. fetch 요청 사이클 완료`);
    });
});
