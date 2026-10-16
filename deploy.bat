@echo off
chcp 65001 >nul
color 0A
title MATRIX DEPLOY // GITHUB & VERCEL

echo ======================================================================
echo           [+] MATRIX NEURAL CIPHER v2.0 - DEPLOY AUTOMATICO [+]
echo           Enviando atualizacoes para o GitHub e Vercel...
echo ======================================================================
echo.

:: Verifica se o Git esta instalado
where git >nul 2>&1
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERRO] O Git nao foi encontrado no PATH do sistema.
    echo Por favor, instale o Git ou configure as variaveis de ambiente.
    echo.
    pause
    exit /b 1
)

:: Exibe status atual
echo [*] Verificando arquivos alterados...
git status --short
echo.

:: Pergunta a mensagem do commit
set DEFAULT_MSG=feat: upgrade Matrix Neural Cipher v2.0 - novo algoritmo, UI futurista responsiva e identidade visual
echo Pressione ENTER para usar a mensagem padrao:
echo "%DEFAULT_MSG%"
echo.
set /p USER_MSG="Digite a mensagem do commit (opcional): "

if "%USER_MSG%"=="" (
    set COMMIT_MSG=%DEFAULT_MSG%
) else (
    set COMMIT_MSG=%USER_MSG%
)

echo.
echo ======================================================================
echo [*] Etapa 1/3: Adicionando arquivos (git add .)...
git add .
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERRO] Falha ao adicionar arquivos.
    pause
    exit /b 1
)

echo.
echo [*] Etapa 2/3: Criando commit com a mensagem:
echo     "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
:: Se nao houver nada para commitar mas houver commits pendentes, prossegue

echo.
echo [*] Etapa 3/3: Enviando para o GitHub (git push origin main)...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo.
    color 0E
    echo [AVISO] O 'git push' direto encontrou uma pendencia.
    echo Tentando sincronizar com a branch remota antes de enviar...
    git pull origin main --rebase
    git push origin main
    if %ERRORLEVEL% neq 0 (
        color 0C
        echo.
        echo [ERRO] Nao foi possivel enviar para o GitHub.
        echo Verifique suas credenciais do GitHub (login/token) ou sua conexao.
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ======================================================================
color 0A
echo [SUCESSO] Codigo enviado com sucesso para o GitHub!
echo.
echo [*] A Vercel detectara o push na branch 'main' e iniciara o deploy
echo     automaticamente em instantes.
echo.
echo Repositorio: https://github.com/Hyuryx/criptografia-de-texto
echo Link Vercel : https://criptografia-de-texto.vercel.app/
echo ======================================================================
echo.
pause
