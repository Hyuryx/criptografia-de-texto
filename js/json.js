document.addEventListener('DOMContentLoaded', function () {
    const inputElement = document.getElementById('inputTexto');
    const outputElement = document.getElementById('outputTexto');
    const segundaImagem = document.getElementById('segundaImagem');

    inputElement.addEventListener('focus', function () {
        mostrarPrimeiraImagem();
    });

    document.querySelector('.botao__criptografar').addEventListener('click', function () {
        criptografar();
        esconderSegundaImagem();
    });

    document.querySelector('.botao__descriptografar').addEventListener('click', function () {
        descriptografar();
        esconderSegundaImagem();
    });

    document.querySelector('.botao__copiar').addEventListener('click', function () {
        copiarTexto();
    });

    document.querySelector('.botao__resetar').addEventListener('click', function () {
        resetarCampos();
        mostrarSegundaImagem();
    });

    function removeAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function criptografar() {
        let texto = removeAcentos(inputElement.value);
        texto = texto.replace(/e/gi, 'enter')
            .replace(/i/gi, 'imes')
            .replace(/a/gi, 'ai')
            .replace(/o/gi, 'ober')
            .replace(/u/gi, 'ufat');
        outputElement.value = texto;
    }

    function descriptografar() {
        let texto = outputElement.value;
        texto = texto.replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ai/g, 'a')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
        outputElement.value = texto;
    }

    function copiarTexto() {
        outputElement.select();
        document.execCommand('copy');
        alert('Texto copiado com sucesso!');
    }

    function resetarCampos() {
        inputElement.value = '';
        outputElement.value = '';
    }

    function mostrarPrimeiraImagem() {
        // Lógica para mostrar a primeira imagem se necessário
    }

    function mostrarSegundaImagem() {
        segundaImagem.classList.remove('invisible');
    }

    function esconderSegundaImagem() {
        segundaImagem.classList.add('invisible');
    }
});

