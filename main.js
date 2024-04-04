const { Client, LocalAuth} = require('whatsapp-web.js');
// const { MessageMedia } = require('whatsapp-web.js');

import { getMessage } from './getMessage.js';
import { sendMessage } from './sendMesage.js';
import {sendMedia} from './sendMedia.js';

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
        console.log('Client is ready!');
    });

    // When the client received QR-Code
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    // função que ouvi todas as emnsagens do zap zap 
    getMessage(client)

    // função que envia mensagem 
    sendMessage(client)

    //função que envias o horáro de provas
    sendMedia(client)

    // Start your client
    client.initialize();    
} catch (error) {
    console.log(Error,``)
}
