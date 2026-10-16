@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
color 0A
title MATRIX DEPLOY // GITHUB ^& VERCEL

echo ======================================================================
echo           [+] MATRIX NEURAL CIPHER v2.0 - DEPLOY AUTOMATICO [+]
echo           Enviando atualizacoes para o GitHub e Vercel...
echo ======================================================================
echo.

:: 1. Verifica se o Git esta instalado
where git >nul 2>&1
if errorlevel 1 goto :git_nao_encontrado

:: 2. Exibe arquivos alterados
echo [*] Verificando arquivos alterados...
git status --short
echo.

:: 3. Definicao da mensagem do commit
set DEFAULT_MSG=feat: upgrade Matrix Neural Cipher v2.0 - novo algoritmo, UI futurista responsiva e identidade visual
echo Pressione ENTER para usar a mensagem padrao:
echo "%DEFAULT_MSG%"
echo.
set /p USER_MSG="Digite a mensagem do commit (opcional): "

set COMMIT_MSG=%DEFAULT_MSG%
if not "%USER_MSG%"=="" set COMMIT_MSG=%USER_MSG%

echo.
echo ======================================================================
echo [*] Etapa 1/3: Adicionando arquivos (git add .)...
git add .
if errorlevel 1 goto :erro_add

echo.
echo [*] Etapa 2/3: Criando commit...
echo     "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
:: Se nao houver alteracoes a commitar, prossegue normalmente sem travar

echo.
echo [*] Etapa 3/3: Enviando para o GitHub (git push origin main)...
git push origin main
if errorlevel 1 goto :tentar_sincronizacao

goto :sucesso

:tentar_sincronizacao
echo.
color 0E
echo [AVISO] Pendencia detectada no push direto. Sincronizando com a branch remota...
git pull origin main --rebase
git push origin main
if errorlevel 1 goto :erro_push
goto :sucesso

:sucesso
echo.
echo ======================================================================
color 0A
echo [SUCESSO] Codigo enviado com sucesso para o GitHub!
echo.
if exist ".vercel" goto :deploy_vercel

echo [*] Caso a Vercel nao tenha disparado automaticamente via GitHub,
echo     voce pode publicar diretamente via CLI rodando:
echo     npx vercel login
echo     npx vercel --prod
goto :fim_sucesso

:deploy_vercel
echo [*] Projeto vinculado a Vercel detectado!
echo [*] Disparando publicacao direta na Vercel...
call npx vercel --prod --yes

:fim_sucesso
echo.
echo Repositorio : https://github.com/Hyuryx/criptografia-de-texto
echo Link Vercel : https://criptografia-de-texto.vercel.app/
echo ======================================================================
echo.
pause
exit /b 0

:git_nao_encontrado
color 0C
echo.
echo [ERRO] O comando 'git' nao foi encontrado no PATH do sistema.
echo Por favor, instale o Git ou configure as variaveis de ambiente.
echo.
pause
exit /b 1

:erro_add
color 0C
echo.
echo [ERRO] Falha ao adicionar os arquivos com 'git add .'.
echo.
pause
exit /b 1

:erro_push
color 0C
echo.
echo [ERRO] Nao foi possivel enviar para o GitHub.
echo Verifique sua conexao e se esta autenticado no GitHub.
echo.
pause
exit /b 1
