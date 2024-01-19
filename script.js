const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFoco = document.getElementById('alternar-musica');
const btnStartPause = document.getElementById('start-pause');
const startPauseBtn = document.querySelector('#start-pause span');
const startPauseImage = document.querySelector('.app__card-primary-butto-icon');
const timer = document.getElementById('timer');

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somContagem = new Audio('./sons/beep.mp3');

musica.loop = true;

let tempoDecorridoSegundos = 1500
let intervaloId = null

musicaFoco.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500
    alterarContexto('foco');
    focoBtn.classList.add('active')
});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 300
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active')
});

longoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 900
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active')
});

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch(contexto){
        case 'foco':
            titulo.innerHTML = ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = ` Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = ` Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0){
        somContagem.play()
        zerar();
        alert('Tempo finalizado.')
        return
    }
    tempoDecorridoSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoSegundos)
    mostrarTempo()
}

btnStartPause.addEventListener('click', startPause)

function startPause(){
    if(intervaloId){
        somPause.play()
        somContagem.pause()
        zerar()
        return
    }
    somPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBtn.textContent = "Pausar"
    startPauseImage.setAttribute('src', './imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    startPauseBtn.textContent = "Começar"
    startPauseImage.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()