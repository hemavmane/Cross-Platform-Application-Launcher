@echo off
echo Installing Cross-Platform Launcher Service...

set SERVICE_NAME=CrossPlatformLauncherService
set NODE_PATH=C:\Program Files\nodejs\node.exe
set APP_PATH=C:\cross-platform-launcher\server\src\index.js

nssm install %SERVICE_NAME% "%NODE_PATH%" "%APP_PATH%"
nssm set %SERVICE_NAME% AppDirectory C:\cross-platform-launcher\server\src
nssm start %SERVICE_NAME%

echo Service installed and started!
pause