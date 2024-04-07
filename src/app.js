const { Client, LocalAuth} = require('whatsapp-web.js');
const fs = require('fs');

import { consoleText } from './utils/consoleText.js';
import { generateSticker } from './api/controllers/generateSticker.js';
import { sendMessage } from './api/controllers/sendMesage.js';
import { sendMedia } from './api/controllers/sendMedia.js';
import { tickAll } from './api/controllers/tickall.js';

export async function App(){
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

        // função que ouvi todas as emnsagens do zap zap 
        // getMessage(client)

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
        console.log(Error,``)
    }    
}

