const { Client, LocalAuth , MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path  = require('path');
const qrcode = require('qrcode-terminal');


// Create a new client instance
const client = new Client({ 
    authStrategy: new LocalAuth({ 
        dataPath: "sessions1", 
    }), 
    webVersionCache: { 
        type: 'remote', 
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', 
        }
        });

// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Listening to all incoming messages
client.on('message_create', message => {
	
    if (message.body === '!bomdia') {
		// reply back "pong" directly to the message
		message.reply('não sou um bot');
	}

});

client.on('message_revoke_everyone', async (after, before) => {
    // 'after' é a mensagem como está depois de ser apagada (geralmente nula)
    // 'before' é a mensagem antes de ser apagada
    if (before) {
         const audioPath =  path.join('meme.mp3');
        // Caminho absoluto para o arquivo de áudio

        try {
            if (fs.existsSync(audioPath)) {
                console.log('Arquivo de áudio encontrado:', audioPath);

                const audioData = fs.readFileSync(audioPath, { encoding: 'base64' });
                const mimetype = 'audio/mp3'; // Altere o tipo MIME se necessário
                const filename = 'meme.mp3'; // Altere o nome do arquivo se necessário
                const filesize = fs.statSync(audioPath).size;

                const audioMedia = new MessageMedia(mimetype, audioData, filename, filesize);

                // Enviar a resposta para a mensagem antes de ser apagada (before)
                await before.reply(audioMedia);
                console.log('Áudio enviado com sucesso!');
            } else {
                console.error('O arquivo de áudio não foi encontrado.');
                // Reagir à mensagem com emoji de erro
                await before.react('❌');
            }
        } catch (error) {
            console.error('Erro ao enviar o áudio:', error);
        }
    }
});

// Start your client
client.initialize()