@echo off
echo ========================================================
echo   GTA VI Animation - MP4 to Code (100% Accuracy)
echo ========================================================
echo   Starting local web server on http://localhost:8085 ...
echo   Press Ctrl+C to stop.
echo ========================================================
start http://localhost:8085
python -m http.server 8085
