const fs = require ('fs');
const path  = require('path');

// essa função envia as provas 
const { MessageMedia } = require('whatsapp-web.js');

async function sendMedia(client){
    client.on('message_create', async (msg) => {
        try {
            if (msg.body === '!provas') {
                const media = MessageMedia.fromFilePath(path.join(__dirname,'../../assets/provas.png'));
                await client.sendMessage(msg.from, media);
            }else if(msg.body === '!horario'){
                const horario = MessageMedia.fromFilePath(path.join(__dirname,'../../assets/horario.jpeg'));
                await client.sendMessage(msg.from, horario)
            }else if(msg.body === '!surpresa'){
                const audioPath = '../../assets/aicachorrofunk.mp3'; // Caminho do arquivo de �udio
                const audio = MessageMedia.fromFilePath(path.join(__dirname,audioPath));
                await client.sendMessage(msg.from, audio);
            }else if(msg.body === '!pix'){
                const audioPath = '../../assets/pix.mp3'; // Caminho do arquivo de �udio
                const audio = MessageMedia.fromFilePath(path.join(__dirname,audioPath));
                await client.sendMessage(msg.from, audio);
            }
        } catch(Error){
            client.sendMessage(msg.from, "*[❎]* Failed load image!");
            console.log(Error)
        }
    });

    // ******************FUNÇÃO DESATIVADA POR SER NOCIVA kjKJKJJKJKKJ********************
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

module.exports = sendMedia;