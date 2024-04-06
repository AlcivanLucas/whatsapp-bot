const fs = require('fs');
const path  = require('path');

// essa função envia as provas 
const { MessageMedia } = require('whatsapp-web.js');

export async function sendMedia(client){
    // client initialization...

    client.on('message_create', async (msg) => {
        if (msg.body === '!provas') {
            const media = MessageMedia.fromFilePath('./src/assets/provas.png');
            await client.sendMessage(msg.from, media);
        }else if(msg.body === '!horario'){
            const horario = MessageMedia.fromFilePath('./src/assets/horario.jpeg');
            await client.sendMessage(msg.from, horario)
        }else if(msg.body === '!surpresa'){
            const audioPath = './src/assets/aicachorrofunk.mp3'; // Caminho do arquivo de �udio
            const audio = MessageMedia.fromFilePath(audioPath);
            await client.sendMessage(msg.from, audio);
        }else if(msg.body === '!pix'){
            const audioPath = './src/assets/pix.mp3'; // Caminho do arquivo de �udio
            const audio = MessageMedia.fromFilePath(audioPath);
            await client.sendMessage(msg.from, audio);
        }
    });

    // ******************FUNÇÃO DESATIVA POR TER NOCIVA kjKJKJJKJKKJ********************
    // manda um Audio quando alguem apaga a mensagem 
    // client.on('message_revoke_everyone', async (after, before) => {
    //     // 'after' é a mensagem como está depois de ser apagada (geralmente nula)
    //     // 'before' é a mensagem antes de ser apagada
    //     if (before) {
    //         const audioPath = path.resolve(__dirname, './src/assets/quem_escreve_e_apaga_depois.mp3'); // Caminho absoluto para o arquivo de áudio
    
    //         try {
    //             if (fs.existsSync(audioPath)) {
    //                 console.log('Arquivo de áudio encontrado:', audioPath);
    
    //                 const audioData = fs.readFileSync(audioPath, { encoding: 'base64' });
    //                 const mimetype = 'audio/mp3'; // Altere o tipo MIME se necessário
    //                 const filename = 'meme.mp3'; // Altere o nome do arquivo se necessário
    //                 const filesize = fs.statSync(audioPath).size;
    
    //                 const audioMedia = new MessageMedia(mimetype, audioData, filename, filesize);
    
    //                 // Enviar a resposta para a mensagem antes de ser apagada (before)
    //                 await before.reply(audioMedia);
    //                 console.log('Áudio enviado com sucesso!');
    //             } else {
    //                 console.error('O arquivo de áudio não foi encontrado.');
    //                 // Reagir à mensagem com emoji de erro
    //                 await before.react('❌');
    //             }
    //         } catch (error) {
    //             console.error('Erro ao enviar o áudio:', error);
    //         }
    //     }
    // });


}