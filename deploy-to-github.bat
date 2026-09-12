@echo off
title Maison Bellavita - Deploy to GitHub Pages
echo ===================================================
echo   MAISON BELLAVITA - 24/7 GITHUB PAGES DEPLOYMENT
echo ===================================================
echo.
echo Your code, assets, frames, and .nojekyll are already committed!
echo.
set /p REPO_URL="Paste your GitHub Repository URL (e.g. https://github.com/USERNAME/repo-name.git): "
if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Exiting.
    pause
    exit /b
)

echo.
echo [1/3] Setting remote repository...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo [2/3] Uploading to GitHub...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [NOTE] If prompted by GitHub, sign in using your browser.
    echo If push failed, ensure you created the empty repository on GitHub first.
    pause
    exit /b
)

echo.
echo [3/3] Done! Your website is uploaded to GitHub.
echo.
echo ===================================================
echo NEXT STEP (Takes 10 seconds):
echo 1. Open your repository on GitHub.
echo 2. Click "Settings" (gear icon) -> "Pages" (left sidebar).
echo 3. Under "Build and deployment" -> "Source", select "GitHub Actions".
echo.
echo Your website will be live 24/7 with zero watermarks!
echo ===================================================
pause
