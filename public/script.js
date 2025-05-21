const botaoEnviar = document.getElementById('enviar');
const caixaDeMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens');
const nomeInput = document.getElementById('myname'); 

const socket = io();

botaoEnviar.addEventListener('click', enviarMensagem);

nomeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // evita o envio do form
        if (nomeInput.value.trim() !== '') {
            caixaDeMensagem.focus(); // envia o foco para a caixa de mensagem
        } else {
            alert('Por favor, insira um nome válido.');
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && document.activeElement === caixaDeMensagem) {
        e.preventDefault();
        enviarMensagem();
    }
});

    function enviarMensagem() {
    const nome = nomeInput.value.trim();
    const texto = caixaDeMensagem.value.trim();

    if (!nome) {
        alert('Por favor, insira seu nome antes de enviar mensagens.');
        return;
    }

    if (texto !== "") {
        const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        socket.emit('nova mensagem', {
            nome: nome,
            texto: texto,
            hora: hora
        });

        caixaDeMensagem.value = "";
    }
}

    socket.on('nova mensagem', (msg) => {
    const nomeUsuario = nomeInput.value.trim();
    const ehMinhaMensagem = msg.nome === nomeUsuario;

    const elementoMensagem = document.createElement('li');
    elementoMensagem.classList.add('mensagem');
    elementoMensagem.classList.add(ehMinhaMensagem ? 'minha-mensagem' : 'mensagem-outro');

    const nomeElement = document.createElement('strong');
    nomeElement.textContent = msg.nome;
    nomeElement.style.display = 'block';
    nomeElement.style.marginBottom = '4px';

    const textoElement = document.createElement('span');
    textoElement.textContent = msg.texto;

    const horaElement = document.createElement('span');
    horaElement.classList.add('hora');
    horaElement.textContent = msg.hora;

    elementoMensagem.appendChild(nomeElement);
    elementoMensagem.appendChild(textoElement);
    elementoMensagem.appendChild(horaElement);

    chat.appendChild(elementoMensagem);
    chat.scrollTop = chat.scrollHeight;
});
