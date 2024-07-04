document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById("myAudio");

    // Reinicia o áudio quando terminar
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    // Função para iniciar a reprodução
    window.playAudio = function() {
        audio.play();
    }

    // Função para pausar a reprodução
    window.pauseAudio = function() {
        audio.pause();
    }

    // Função para parar a reprodução (retorna ao início)
    window.stopAudio = function() {
        audio.pause();
        audio.currentTime = 0;
    }
});


