/**
 * MATRIX CYBER APPLICATION CONTROLLER
 * Orquestrador de interface, efeitos Matrix, sons sintéticos e animações.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências do DOM
    const inputTexto = document.getElementById('inputTexto');
    const outputTexto = document.getElementById('outputTexto');
    const emptyState = document.getElementById('emptyState');
    const inputCharCount = document.getElementById('inputCharCount');
    const outputCharCount = document.getElementById('outputCharCount');

    // Botões
    const btnCriptografar = document.getElementById('btnCriptografar');
    const btnDescriptografar = document.getElementById('btnDescriptografar');
    const btnCopiar = document.getElementById('btnCopiar');
    const btnResetar = document.getElementById('btnResetar');
    const btnInverter = document.getElementById('btnInverter');
    const btnLimparInput = document.getElementById('btnLimparInput');
    const btnColarInput = document.getElementById('btnColarInput');
    const btnToggleRain = document.getElementById('btnToggleRain');

    // Toasts container
    const toastContainer = document.getElementById('toastContainer');

    // ==========================================
    // EFEITOS SONOROS SINTÉTICOS (Web Audio API)
    // ==========================================
    let audioCtx = null;
    let sfxEnabled = true;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playBeep(freq = 600, duration = 0.05, type = 'sine') {
        if (!sfxEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            // Silencioso se bloqueado
        }
    }

    function playCipherGlitch() {
        if (!sfxEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    playBeep(400 + Math.random() * 800, 0.03, 'sawtooth');
                }, i * 50);
            }
        } catch (e) {}
    }

    window.MatrixFX = {
        playBeep,
        playCipherGlitch
    };

    // ==========================================
    // SISTEMA DE NOTIFICAÇÕES (TOASTS)
    // ==========================================
    function showToast(message, type = 'success', duration = 3500) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `cyber-toast cyber-toast--${type}`;

        const iconSvg = type === 'error'
            ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
            : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        toast.innerHTML = `
            <span class="cyber-toast__icon">${iconSvg}</span>
            <div class="cyber-toast__content">
                <div class="cyber-toast__title">${type === 'error' ? 'ALERTA DO SISTEMA' : 'PROTOCOLO CONFIRMADO'}</div>
                <div class="cyber-toast__text">${message}</div>
            </div>
            <div class="cyber-toast__bar"></div>
        `;

        toastContainer.appendChild(toast);

        // Som de feedback
        if (type === 'error') {
            playBeep(220, 0.15, 'sawtooth');
        } else {
            playBeep(880, 0.08, 'sine');
        }

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, duration);
    }

    // ==========================================
    // ATUALIZAÇÃO DE CONTADORES E ESTADO
    // ==========================================
    function updateCounters() {
        const inLen = inputTexto.value.length;
        const outLen = outputTexto.value.length;

        if (inputCharCount) {
            inputCharCount.textContent = `${inLen} ${inLen === 1 ? 'CARACTERE' : 'CARACTERES'}`;
        }
        if (outputCharCount) {
            outputCharCount.textContent = `${outLen} ${outLen === 1 ? 'CARACTERE' : 'CARACTERES'}`;
        }

        if (outLen > 0) {
            emptyState.classList.add('hidden');
            outputTexto.classList.remove('hidden');
        } else {
            emptyState.classList.remove('hidden');
            outputTexto.classList.add('hidden');
        }
    }

    // ==========================================
    // EFEITO DE MATRIX SCRAMBLE DECODING
    // ==========================================
    const MATRIX_SCRAMBLE_GLYPHS = "0101_~#$&*[]{}<>!@+=-%?ΞΨΩλπ0123456789";

    function scrambleDecodeAnimation(targetElement, finalString, onComplete) {
        let iterations = 0;
        const maxIterations = 14;
        const targetLen = finalString.length;
        playCipherGlitch();

        const interval = setInterval(() => {
            iterations++;
            let current = '';
            for (let i = 0; i < targetLen; i++) {
                if (finalString[i] === '\n') {
                    current += '\n';
                } else if (i < (iterations / maxIterations) * targetLen) {
                    current += finalString[i];
                } else {
                    current += MATRIX_SCRAMBLE_GLYPHS[Math.floor(Math.random() * MATRIX_SCRAMBLE_GLYPHS.length)];
                }
            }
            targetElement.value = current;

            if (iterations >= maxIterations) {
                clearInterval(interval);
                targetElement.value = finalString;
                updateCounters();
                if (onComplete) onComplete();
            }
        }, 25);
    }

    // ==========================================
    // AÇÕES DE CRIPTOGRAFIA / DESCRIPTOGRAFIA
    // ==========================================
    function executarCriptografia() {
        const texto = inputTexto.value;
        if (!texto || !texto.trim()) {
            showToast("Digite ou cole um texto no Terminal 01 para criptografar.", "error");
            inputTexto.focus();
            return;
        }

        try {
            const criptografado = window.MatrixCipher.encrypt(texto);
            emptyState.classList.add('hidden');
            outputTexto.classList.remove('hidden');

            scrambleDecodeAnimation(outputTexto, criptografado, () => {
                showToast("Dados criptografados com o protocolo Matrix v2.0!");
            });
        } catch (err) {
            showToast("Erro ao processar criptografia: " + err.message, "error");
        }
    }

    function executarDescriptografia() {
        // Se o usuário digitou no campo de entrada
        let textoAlvo = inputTexto.value.trim();

        // Se o campo de entrada estiver vazio, tenta ler o que já está na saída
        if (!textoAlvo && outputTexto.value.trim()) {
            textoAlvo = outputTexto.value.trim();
        }

        if (!textoAlvo) {
            showToast("Nenhum código criptografado encontrado para decodificar.", "error");
            inputTexto.focus();
            return;
        }

        try {
            const descriptografado = window.MatrixCipher.decrypt(textoAlvo);
            emptyState.classList.add('hidden');
            outputTexto.classList.remove('hidden');

            scrambleDecodeAnimation(outputTexto, descriptografado, () => {
                showToast("Dados decodificados com sucesso!");
            });
        } catch (err) {
            showToast(err.message, "error");
        }
    }

    function copiarResultado() {
        const texto = outputTexto.value;
        if (!texto || !texto.trim()) {
            showToast("Nenhum texto disponível para cópia no Terminal 02.", "error");
            return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).then(() => {
                showToast("Código criptográfico copiado para a área de transferência!");
                playBeep(920, 0.08);
            }).catch(() => {
                fallbackCopy(texto);
            });
        } else {
            fallbackCopy(texto);
        }
    }

    function fallbackCopy(texto) {
        outputTexto.select();
        document.execCommand('copy');
        showToast("Código copiado para a área de transferência!");
        playBeep(920, 0.08);
    }

    function inverterTerminais() {
        const inVal = inputTexto.value;
        const outVal = outputTexto.value;

        if (!inVal && !outVal) {
            showToast("Terminais vazios. Nada para inverter.", "error");
            return;
        }

        inputTexto.value = outVal;
        outputTexto.value = inVal;
        updateCounters();
        playBeep(700, 0.06);
        showToast("Conteúdos dos terminais invertidos.");
    }

    function resetarTudo() {
        inputTexto.value = '';
        outputTexto.value = '';
        updateCounters();
        playBeep(350, 0.08);
        showToast("Sistema reiniciado. Todos os terminais limpos.");
    }

    // ==========================================
    // LISTENERS DE EVENTOS
    // ==========================================
    if (btnCriptografar) {
        btnCriptografar.addEventListener('click', () => {
            playBeep(650, 0.05);
            executarCriptografia();
        });
    }

    if (btnDescriptografar) {
        btnDescriptografar.addEventListener('click', () => {
            playBeep(520, 0.05);
            executarDescriptografia();
        });
    }

    if (btnCopiar) {
        btnCopiar.addEventListener('click', () => {
            copiarResultado();
        });
    }

    if (btnResetar) {
        btnResetar.addEventListener('click', () => {
            resetarTudo();
        });
    }

    if (btnInverter) {
        btnInverter.addEventListener('click', () => {
            inverterTerminais();
        });
    }

    if (btnLimparInput) {
        btnLimparInput.addEventListener('click', () => {
            inputTexto.value = '';
            updateCounters();
            playBeep(400, 0.04);
            inputTexto.focus();
        });
    }

    if (btnColarInput) {
        btnColarInput.addEventListener('click', () => {
            if (navigator.clipboard && navigator.clipboard.readText) {
                navigator.clipboard.readText().then(text => {
                    inputTexto.value = text;
                    updateCounters();
                    playBeep(600, 0.05);
                    showToast("Texto colado com sucesso!");
                }).catch(() => {
                    showToast("Permissão de área de transferência recusada pelo navegador.", "error");
                });
            } else {
                showToast("Use Ctrl+V para colar neste navegador.", "error");
            }
        });
    }

    inputTexto.addEventListener('input', updateCounters);
    outputTexto.addEventListener('input', updateCounters);

    // ==========================================
    // MATRIX DIGITAL RAIN CANVAS EFFECT
    // ==========================================
    const canvas = document.getElementById('matrixRainCanvas');
    let matrixRainActive = true;
    let rainAnimId = null;

    if (canvas) {
        const ctx = canvas.getContext('2d');
        const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
        const fontSize = 15;
        let columns = 0;
        let drops = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
            }
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function drawMatrixRain() {
            if (!matrixRainActive) return;

            // Fundo semi-transparente para criar o rastro
            ctx.fillStyle = 'rgba(0, 5, 2, 0.07)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'Kode Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Caractere da ponta mais brilhante / branco-verde
                ctx.fillStyle = '#b3ffcc';
                ctx.fillText(char, x, y);

                // Rastro em verde neon
                ctx.fillStyle = '#00ff66';
                if (drops[i] > 1) {
                    const prevChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    ctx.fillText(prevChar, x, y - fontSize);
                }

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            rainAnimId = requestAnimationFrame(drawMatrixRain);
        }

        drawMatrixRain();

        if (btnToggleRain) {
            btnToggleRain.addEventListener('click', () => {
                matrixRainActive = !matrixRainActive;
                btnToggleRain.classList.toggle('active', matrixRainActive);
                if (matrixRainActive) {
                    drawMatrixRain();
                    showToast("Chuva Matrix ativada.");
                } else {
                    if (rainAnimId) cancelAnimationFrame(rainAnimId);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    showToast("Chuva Matrix pausada.");
                }
            });
        }
    }

    // Inicializa contadores
    updateCounters();
});
