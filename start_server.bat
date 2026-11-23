@echo off
title Arifsec.com - Development Server
set "PATH=%PATH%;C:\Program Files\nodejs;%APPDATA%\npm"
echo ===================================================================
echo   Starting Muhammad Arif Phulpoto Portfolio (Vite + React)
echo   URL: http://localhost:3000
echo ===================================================================
echo.
start http://localhost:3000
call npm.cmd run dev -- --port 3000
pause
