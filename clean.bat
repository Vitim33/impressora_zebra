@echo off
echo ------------------------------------------------------
echo Limpando node_modules e cache do React Native
echo ------------------------------------------------------

REM Remove node_modules
IF EXIST node_modules (
    rmdir /s /q node_modules
)

REM Remove package-lock.json
IF EXIST package-lock.json (
    del /f /q package-lock.json
)

echo Limpando cache do npm...
npm cache clean --force

echo Instalando dependencias...
npm install

echo ------------------------------------------------------
echo Iniciando Metro com cache limpo
echo ------------------------------------------------------
npx react-native start --reset-cache
