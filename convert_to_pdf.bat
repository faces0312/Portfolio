@echo off
echo 서현석 포트폴리오 PDF 변환 도구
echo ================================

echo.
echo 1. 필요한 패키지 설치 중...
call npm install

echo.
echo 2. PDF 변환 시작...
call node convert_to_pdf.js

echo.
echo 3. 변환 완료!
echo 생성된 파일: 서현석_Portfolio.pdf
echo.

pause

