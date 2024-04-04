

export async function sendMessage(client){

    client.on('message_create', message => {
        if (message.body === '!help') {
            // send back "pong" to the chat the message was sent in
            client.sendMessage(message.from, 
                `*--------Lista de comandos Bot--------* \n  \n *!registrar* (não funcional) - registra reclamação \n *!figurinha* (não funcional) - cria uma figurinha apartir de uma imagem marcada \n *!opção 1* - não sei o que botar aqui \n *!opção 2* - não sei o que botar aqui \n  `);

        }else if(message.body === '!hello'){
            message.reply(`Hello Cachorro 😜✌️`)
        }

    });
}


// message.reply('pong');   ele envia a mensagem, respondendo o comando 