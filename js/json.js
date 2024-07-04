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

    function criptografar() {
        let texto = inputElement.value;
        texto = texto.replace(/[eéèêë]/gi, match => match.toLowerCase() === 'e' ? 'enter' : match.toLowerCase() === 'é' ? 'énter' : match.toLowerCase() === 'è' ? 'ènter' : match.toLowerCase() === 'ê' ? 'ênter' : 'ënter')

            .replace(/[iíìîï]/gi, match => match.toLowerCase() === 'i' ? 'imes' : match.toLowerCase() === 'í' ? 'ímes' : match.toLowerCase() === 'ì' ? 'ìmes' : match.toLowerCase() === 'î' ? 'îmes' : 'ïmes')

            .replace(/[aáàâäãå]/gi, match => match.toLowerCase() === 'a' ? 'ai' : match.toLowerCase() === 'á' ? 'ái' : match.toLowerCase() === 'à' ? 'ài' : match.toLowerCase() === 'â' ? 'âi' : match.toLowerCase() === 'ä' ? 'äi' : match.toLowerCase() === 'ã' ? 'ãi' : 'åi')

            .replace(/[oóòôöõø]/gi, match => match.toLowerCase() === 'o' ? 'ober' : match.toLowerCase() === 'ó' ? 'óber' : match.toLowerCase() === 'ò' ? 'òber' : match.toLowerCase() === 'ô' ? 'ôber' : match.toLowerCase() === 'ö' ? 'öber' : match.toLowerCase() === 'õ' ? 'õber' : 'øber')

            .replace(/[uúùûü]/gi, match => match.toLowerCase() === 'u' ? 'ufat' : match.toLowerCase() === 'ú' ? 'úfat' : match.toLowerCase() === 'ù' ? 'ùfat' : match.toLowerCase() === 'û' ? 'ûfat' : 'üfat');
        outputElement.value = texto;
    }

    function descriptografar() {
        let texto = inputElement.value; // Use outputElement para descriptografar o texto
        texto = texto.replace(/énter/g, 'é').replace(/ènter/g, 'è').replace(/ênter/g, 'ê').replace(/ënter/g, 'ë').replace(/enter/g, 'e')

            .replace(/ímes/g, 'í').replace(/ìmes/g, 'ì').replace(/îmes/g, 'î').replace(/ïmes/g, 'ï').replace(/imes/g, 'i')

            .replace(/ái/g, 'á').replace(/ài/g, 'à').replace(/âi/g, 'â').replace(/äi/g, 'ä').replace(/ãi/g, 'ã').replace(/åi/g, 'å').replace(/ai/g, 'a')

            .replace(/óber/g, 'ó').replace(/òber/g, 'ò').replace(/ôber/g, 'ô').replace(/öber/g, 'ö').replace(/õber/g, 'õ').replace(/øber/g, 'ø').replace(/ober/g, 'o')
            
            .replace(/úfat/g, 'ú').replace(/ùfat/g, 'ù').replace(/ûfat/g, 'û').replace(/üfat/g, 'ü').replace(/ufat/g, 'u');
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

