const { Client, LocalAuth} = require('whatsapp-web.js');
const fs = require('fs');
const consoleText = require('./utils/consoleText.js')
const generateSticker  = require('./api/controllers/generateSticker.js');
const sendMessage  = require('./api/controllers/sendMessage.js');
const sendMedia  = require('./api/controllers/sendMedia.js');
const tickAll  = require('./api/controllers/tickAll.js');

try {
    // Create a new client instance
    const client = new Client({ 
        authStrategy: new LocalAuth({ 
            dataPath: "sessions", 
        }), 
        webVersionCache: { 
            type: 'remote', 
            remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', 
        },
        puppeteer: {
            executablePath: '/usr/bin/google-chrome-stable',
        }
    });

    const qrcode = require('qrcode-terminal');

    // When the client is ready, run this code (only once)
    client.on('ready', () => {
        console.clear();
        consoleText() //exibi no terminal o nome do bot 


    });

    // When the client received QR-Code
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    // função que envia mensagem 
    sendMessage(client)

    //função que envia mídias 
    sendMedia(client)

    // função converte image em sticker
    generateSticker(client)

    // função que marca todos os integrantes do grupo
    tickAll(client)

    // Start your client
    client.initialize();    
} catch (error) {
    console.log(Error, error)
}    


