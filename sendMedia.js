// essa função envia as provas 

const { MessageMedia } = require('whatsapp-web.js');

export async function sendMedia(client){
    // client initialization...

    client.on('message', async (msg) => {
        if (msg.body === '!provas') {
            const media = MessageMedia.fromFilePath('./provas.png');
            await client.sendMessage(msg.from, media);
        }
    });


}