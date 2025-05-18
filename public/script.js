const botaoEnviar = document.getElementById('enviar');
const caixaDeMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens')

const socket = io();

botaoEnviar.addEventListener('click', () => {
    if (caixaDeMensagem.value !== ""){
        socket.emit('nova mensagem', caixaDeMensagem.value)
        caixaDeMensagem.value = ""
    }
})

socket.addEventListener('nova mensagem', (msg) => {
    const elementoMensagem = document.createElement('li'); // cria o li
    elementoMensagem.textContent = msg; // adiciona as mensagens no formato <li>conteudo</li>
    elementoMensagem.classList.add('mensagem'); // adiciona o css
    chat.appendChild(elementoMensagem) // transforma no "filho" de uma tag deixando o codico completo e já estilizado <div id = 'mensagens'><li class = 'mensagem'> conteudo </div>
})
