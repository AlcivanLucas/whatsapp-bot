const fs = require('fs');

async function sendMessage(client){
    client.on('message_create', message => {
        if (message.body === '!help') {
            // send back "pong" to the chat the message was sent in
            client.sendMessage(message.from, 
                `*--------Lista de comandos Bot--------* \n  \n *!registrar* (não funcional) - registra reclamação \n *!figurinha* - imagem para sticker \n *!imagem* - sticker para imagem \n *!tick_all* - marca todas as pessoas do grupo \n *!surpresa* - manda um audio misterioso 🐕 \n  *!provas* -  calendário de provas \n *!horario* - Horário de aula \n `);

        }else if(message.body === '!hello'){
            message.reply(`Hello Cachorro 😜`)
        }
    });
}

module.exports = sendMessage;