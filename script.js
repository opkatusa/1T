// DOM 요소 선택
const textInput = document.getElementById('textInput');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const fontFamily = document.getElementById('fontFamily');
const textColor = document.getElementById('textColor');
const bgColor = document.getElementById('bgColor');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 폰트 크기 업데이트
fontSize.addEventListener('input', (e) => {
    fontSizeValue.textContent = e.target.value;
});

// 생성 버튼 클릭
generateBtn.addEventListener('click', generateImage);

// 다운로드 버튼 클릭
downloadBtn.addEventListener('click', downloadImage);

// 실시간 업데이트 (텍스트, 색상, 폰트 변경 시)
textInput.addEventListener('input', generateImage);
textColor.addEventListener('input', generateImage);
bgColor.addEventListener('input', generateImage);
fontFamily.addEventListener('change', generateImage);
fontSize.addEventListener('input', generateImage);

// 이미지 생성 함수
function generateImage() {
    const text = textInput.value.trim();
    
    if (!text) {
        // 텍스트가 없으면 캔버스 초기화
        canvas.width = 600;
        canvas.height = 300;
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#999';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('텍스트를 입력하세요', canvas.width / 2, canvas.height / 2);
        downloadBtn.disabled = true;
        return;
    }

    const size = parseInt(fontSize.value);
    const family = fontFamily.value;
    const textColorValue = textColor.value;
    const bgColorValue = bgColor.value;

    // 캔버스 크기 설정
    canvas.width = 800;
    canvas.height = 400;

    // 배경 그리기
    ctx.fillStyle = bgColorValue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 텍스트 스타일 설정
    ctx.font = `bold ${size}px ${family}`;
    ctx.fillStyle = textColorValue;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 여러 줄의 텍스트 처리
    const lines = text.split('\n');
    const lineHeight = size + 20;
    const totalHeight = lineHeight * lines.length;
    const startY = (canvas.height - totalHeight) / 2 + size / 2;

    lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        ctx.fillText(line, canvas.width / 2, y);
    });

    // 다운로드 버튼 활성화
    downloadBtn.disabled = false;
}

// 이미지 다운로드 함수
function downloadImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `text-image-${Date.now()}.png`;
    link.click();
}

// 페이지 로드 시 기본 이미지 생성
window.addEventListener('load', generateImage);
