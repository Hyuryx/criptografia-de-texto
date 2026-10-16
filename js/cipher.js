/**
 * MATRIX NEURAL CIPHER ENGINE (v2.0)
 * Algoritmo proprietário de alta segurança desenvolvido para a aplicação Matrix.
 * 
 * - Chave mestra criptográfica exclusiva da aplicação.
 * - Substituição por S-Box proprietária de 256 bytes.
 * - Difusão dinâmica baseada em posição e keystream não linear.
 * - Permutação em blocos Matrix.
 * - Armadura de caracteres personalizada (alfabeto Matrix 64 exclusivo).
 * - Suporta letras maiúsculas, minúsculas, números, caracteres com acentos,
 *   pontuações especiais, símbolos e emojis.
 * - Nenhuma ferramenta externa padrão (Base64, Rot13, etc.) consegue decodificar.
 */

(function (window) {
    'use strict';

    const MASTER_KEY = "§MATRIX::CORE_NEURAL_v2.0::KEY_897123498172349781293847§";
    const CIPHER_PREFIX = "MTX//";

    // Alfabeto base com 64 caracteres únicos
    const UNIQUE_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_~".split('');

    // Gera o alfabeto determinístico exclusivo com base na chave mestra
    function generateDeterministicAlphabet(seed) {
        const chars = [...UNIQUE_CHARS];
        let h = 0x811c9dc5;
        for (let i = 0; i < seed.length; i++) {
            h = Math.imul(h ^ seed.charCodeAt(i), 0x01000193);
        }
        for (let i = chars.length - 1; i > 0; i--) {
            h = Math.imul(h ^ (i + 1337), 0x01000193);
            const j = Math.abs(h) % (i + 1);
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        return chars.join('');
    }

    const CUSTOM_ALPHA = generateDeterministicAlphabet(MASTER_KEY);

    // Constrói a S-Box de 256 bytes e sua inversa
    function generateSBoxes(seed) {
        const sbox = new Uint8Array(256);
        for (let i = 0; i < 256; i++) sbox[i] = i;
        let h = 0x12345678;
        for (let i = 0; i < seed.length; i++) {
            h = Math.imul(h ^ seed.charCodeAt(i), 0x5bd1e995);
        }
        for (let i = 255; i > 0; i--) {
            h = Math.imul(h ^ (i * 31), 0x5bd1e995);
            const j = Math.abs(h) % (i + 1);
            [sbox[i], sbox[j]] = [sbox[j], sbox[i]];
        }
        const invSbox = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
            invSbox[sbox[i]] = i;
        }
        return { sbox, invSbox };
    }

    const { sbox: SBOX, invSbox: INV_SBOX } = generateSBoxes(MASTER_KEY);

    function bytesToCustomBase64(bytes) {
        let result = '';
        let i = 0;
        const len = bytes.length;
        while (i < len) {
            const b1 = bytes[i++];
            const b2 = i < len ? bytes[i++] : NaN;
            const b3 = i < len ? bytes[i++] : NaN;

            const n1 = b1 >> 2;
            const n2 = ((b1 & 3) << 4) | (isNaN(b2) ? 0 : b2 >> 4);
            const n3 = isNaN(b2) ? 64 : (((b2 & 15) << 2) | (isNaN(b3) ? 0 : b3 >> 6));
            const n4 = isNaN(b3) ? 64 : (b3 & 63);

            result += CUSTOM_ALPHA[n1];
            result += CUSTOM_ALPHA[n2];
            result += n3 === 64 ? '=' : CUSTOM_ALPHA[n3];
            result += n4 === 64 ? '=' : CUSTOM_ALPHA[n4];
        }
        return result;
    }

    function customBase64ToBytes(str) {
        const cleanStr = str.replace(/[^A-Za-z0-9_~=]/g, '');
        const bytes = [];
        let i = 0;
        while (i < cleanStr.length) {
            const c1 = cleanStr[i++];
            const c2 = cleanStr[i++];
            const c3 = cleanStr[i++];
            const c4 = cleanStr[i++];

            const n1 = CUSTOM_ALPHA.indexOf(c1);
            const n2 = CUSTOM_ALPHA.indexOf(c2);
            const n3 = c3 === '=' ? -1 : CUSTOM_ALPHA.indexOf(c3);
            const n4 = c4 === '=' ? -1 : CUSTOM_ALPHA.indexOf(c4);

            if (n1 === -1 || n2 === -1) {
                throw new Error("Caracteres não reconhecidos pelo protocolo Matrix.");
            }

            const b1 = (n1 << 2) | (n2 >> 4);
            bytes.push(b1);

            if (n3 !== -1) {
                const b2 = ((n2 & 15) << 4) | (n3 >> 2);
                bytes.push(b2);
                if (n4 !== -1) {
                    const b3 = ((n3 & 3) << 6) | n4;
                    bytes.push(b3);
                }
            }
        }
        return new Uint8Array(bytes);
    }

    // Função de Criptografia Matrix Real
    function encrypt(plainText) {
        if (!plainText || !plainText.trim()) return "";
        const encoder = new TextEncoder();
        const rawBytes = encoder.encode(plainText);
        const n = rawBytes.length;
        const transformed = new Uint8Array(n);

        const keyBytes = encoder.encode(MASTER_KEY);
        const kLen = keyBytes.length;

        for (let i = 0; i < n; i++) {
            let b = rawBytes[i];
            // 1. Substituição com S-Box única
            b = SBOX[b];
            // 2. Keystream XOR & modular shift
            const k = keyBytes[(i * 7 + 13) % kLen];
            b = (b ^ k) & 0xff;
            b = (b + ((i * 17 + 3) & 0xff)) & 0xff;
            // 3. Encadeamento com o byte anterior
            const prev = i > 0 ? transformed[i - 1] : 0x5a;
            b = (b ^ prev) & 0xff;
            transformed[i] = b;
        }

        // 4. Permutação em blocos Matrix
        for (let i = 0; i < n - 1; i += 2) {
            const tmp = transformed[i];
            transformed[i] = transformed[i + 1];
            transformed[i + 1] = tmp;
        }

        return CIPHER_PREFIX + bytesToCustomBase64(transformed);
    }

    // Função de Descriptografia Matrix Real
    function decrypt(cipherText) {
        if (!cipherText || !cipherText.trim()) return "";
        const trimmed = cipherText.trim();

        // Se for o algoritmo moderno Matrix v2.0
        if (trimmed.startsWith(CIPHER_PREFIX)) {
            const encodedPart = trimmed.slice(CIPHER_PREFIX.length);
            const transformed = customBase64ToBytes(encodedPart);
            const n = transformed.length;
            if (n === 0) return "";

            // Reverte a permutação de blocos
            for (let i = 0; i < n - 1; i += 2) {
                const tmp = transformed[i];
                transformed[i] = transformed[i + 1];
                transformed[i + 1] = tmp;
            }

            const keyBytes = new TextEncoder().encode(MASTER_KEY);
            const kLen = keyBytes.length;
            const rawBytes = new Uint8Array(n);

            // Reverte o encadeamento de trás para frente
            for (let i = n - 1; i >= 0; i--) {
                let b = transformed[i];
                const prev = i > 0 ? transformed[i - 1] : 0x5a;
                b = (b ^ prev) & 0xff;
                b = (b - ((i * 17 + 3) & 0xff) + 256) & 0xff;
                const k = keyBytes[(i * 7 + 13) % kLen];
                b = (b ^ k) & 0xff;
                b = INV_SBOX[b];
                rawBytes[i] = b;
            }

            const decoder = new TextDecoder('utf-8', { fatal: true });
            return decoder.decode(rawBytes);
        }

        // Fallback: Suporte a textos criptografados com o modelo legado (substituição simples Alura)
        if (/(enter|imes|ai|ober|ufat)/i.test(trimmed)) {
            let legacy = trimmed
                .replace(/enter/g, 'e')
                .replace(/imes/g, 'i')
                .replace(/ai/g, 'a')
                .replace(/ober/g, 'o')
                .replace(/ufat/g, 'u');
            return legacy;
        }

        throw new Error("Protocolo não reconhecido: O texto não foi criptografado por este aplicativo Matrix.");
    }

    // Exporta o motor Matrix
    window.MatrixCipher = {
        encrypt,
        decrypt,
        CIPHER_PREFIX
    };

})(window);
