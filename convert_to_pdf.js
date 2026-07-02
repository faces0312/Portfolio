const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function convertHTMLToPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // HTML 파일의 절대 경로 생성
  const htmlPath = path.resolve(__dirname, 'index.html');
  const fileUrl = `file://${htmlPath}`;
  
  console.log('HTML 파일 로딩 중:', fileUrl);
  
  // HTML 파일 로드
  await page.goto(fileUrl, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  // 모든 섹션을 표시하고 아코디언을 열기
  await page.evaluate(() => {
    // 모든 content-section을 표시
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.style.display = 'block';
      section.classList.add('active');
    });
    
    // 모든 아코디언 섹션을 열기
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      if (header && typeof header.click === 'function') {
        header.click();
      }
    });
  });
  
  // 잠시 대기 (아코디언이 열리는 시간)
  await page.waitForTimeout(2000);
  
  // PDF 생성 옵션
  const pdfOptions = {
    path: '서현석_Portfolio.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      right: '10mm',
      bottom: '15mm',
      left: '10mm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 10px; text-align: center; width: 100%; color: #666; padding: 5px;">
        서현석 Portfolio
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 10px; text-align: center; width: 100%; color: #666; padding: 5px;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
    preferCSSPageSize: false,
    width: '210mm',
    height: '297mm'
  };
  
  console.log('PDF 생성 중...');
  
  // PDF 생성
  await page.pdf(pdfOptions);
  
  console.log('PDF 생성 완료: 서현석_Portfolio.pdf');
  
  await browser.close();
}

// 스크립트 실행
convertHTMLToPDF().catch(console.error);
