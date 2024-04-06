// essa função envia as provas 
const { MessageMedia } = require('whatsapp-web.js');

// const sentMessage = await chat.sendMessage(messageMedia, { sendAudioAsVoice: true })

export async function sendMedia(client){
    // client initialization...

    client.on('message_create', async (msg) => {
        if (msg.body === '!provas') {
            const media = MessageMedia.fromFilePath('./provas.png');
            await client.sendMessage(msg.from, media);
        }else if(msg.body === '!horario'){
            const horario = MessageMedia.fromFilePath('./horario.jpeg');
            await client.sendMessage(msg.from, horario)
        }else if(msg.body === '!surpresa'){
            const audioPath = './aicachorrofunk.mp3'; // Caminho do arquivo de �udio
            const audio = MessageMedia.fromFilePath(audioPath);
            // chat.sendMessage(audio);
            await client.sendMessage(msg.from, audio);
            
        }
    });


}