const { Client, LocalAuth} = require('whatsapp-web.js');
const fs = require('fs');

import { consoleText } from './consoleText.js';
import { generateSticker } from './generateSticker.js';
import { getMessage } from './getMessage.js';
import { sendMessage } from './sendMesage.js';
import {sendMedia} from './sendMedia.js';
import { tickAll } from './tickall.js';

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

    const config = require('./config.json');

    client.on('message', async (message) => {
        const isGroups = message.from.endsWith('@g.us') ? true : false;
        if ((isGroups && config.groups) || !isGroups) {
    
            // Imagem para Figurinha (Auto && Caption)
            // if ((message.type == "image" || message.type == "video" || message.type  == "gif") || (message._data.caption == `${config.prefix}figurinha`)) {
            if ((message.type == "image" || message.type  == "gif") || (message._data.caption == `${config.prefix}figurinha`)) {
                client.sendMessage(message.from, "*[⏳]* Loading..");
                try {
                    const media = await message.downloadMedia();
                    client.sendMessage(message.from, media, {
                        sendMediaAsSticker: true,
                        stickerName: config.name, // Sticker Name = Edit in 'config/config.json'
                        stickerAuthor: config.author // Sticker Author = Edit in 'config/config.json'
                    }).then(() => {
                        client.sendMessage(message.from, "*[✅]* Successfully!");
                    });
                } catch {
                    client.sendMessage(message.from, "*[❎]* Failed!");
                }
    
            // Image to Sticker (With Reply Image)
            } else if (message.body == `${config.prefix}figurinha`) {
                const quotedMsg = await message.getQuotedMessage(); 
                if (message.hasQuotedMsg && quotedMsg.hasMedia) {
                    client.sendMessage(message.from, "*[⏳]* Loading..");
                    try {
                        const media = await quotedMsg.downloadMedia();
                        client.sendMessage(message.from, media, {
                            sendMediaAsSticker: true,
                            stickerName: config.name, // Sticker Name = Edit in 'config/config.json'
                            stickerAuthor: config.author // Sticker Author = Edit in 'config/config.json'
                        }).then(() => {
                            client.sendMessage(message.from, "*[✅]* Successfully!");
                        });
                    } catch {
                        client.sendMessage(message.from, "*[❎]* Failed!");
                    }
                } else {
                    client.sendMessage(message.from, "*[❎]* Reply Image First!");
                }
    
            // Sticker to Image (Auto)
            } else if (message.type == "figurinha") {
                client.sendMessage(message.from, "*[⏳]* Loading..");
                try {
                    const media = await message.downloadMedia();
                    client.sendMessage(message.from, media).then(() => {
                        client.sendMessage(message.from, "*[✅]* Successfully!");
                    });  
                } catch {
                    client.sendMessage(message.from, "*[❎]* Failed!");
                }
    
            // Sticker to Image (With Reply Sticker)
            } else if (message.body == `${config.prefix}imagem`) {
                const quotedMsg = await message.getQuotedMessage(); 
                if (message.hasQuotedMsg && quotedMsg.hasMedia) {
                    client.sendMessage(message.from, "*[⏳]* Loading..");
                    try {
                        const media = await quotedMsg.downloadMedia();
                        client.sendMessage(message.from, media).then(() => {
                            client.sendMessage(message.from, "*[✅]* Successfully!");
                        });
                    } catch {
                        client.sendMessage(message.from, "*[❎]* Failed!");
                    }
                } else {
                    client.sendMessage(message.from, "*[❎]* Reply Sticker First!");
                }
    
            // Claim or change sticker name and sticker author
            } else if (message.body.startsWith(`${config.prefix}change`)) {
                if (message.body.includes('|')) {
                    let name = message.body.split('|')[0].replace(message.body.split(' ')[0], '').trim();
                    let author = message.body.split('|')[1].trim();
                    const quotedMsg = await message.getQuotedMessage(); 
                    if (message.hasQuotedMsg && quotedMsg.hasMedia) {
                        client.sendMessage(message.from, "*[⏳]* Loading..");
                        try {
                            const media = await quotedMsg.downloadMedia();
                            client.sendMessage(message.from, media, {
                                sendMediaAsSticker: true,
                                stickerName: name,
                                stickerAuthor: author
                            }).then(() => {
                                client.sendMessage(message.from, "*[✅]* Successfully!");
                            });
                        } catch {
                            client.sendMessage(message.from, "*[❎]* Failed!");
                        }
                    } else {
                        client.sendMessage(message.from, "*[❎]* Reply Sticker First!");
                    }
                } else {
                    client.sendMessage(message.from, `*[❎]* Run the command :\n*${config.prefix}change <name> | <author>*`);
                }
            
            // Read chat
            } else {
                client.getChatById(message.id.remote).then(async (chat) => {
                    await chat.sendSeen();
                });
            }
        }
    });





    // função converte image em sticker
    // generateSticker(client)

    // função que marca todos os integrantes do grupo
    tickAll(client)

    // Start your client
    client.initialize();    
} catch (error) {
    console.log(Error,``)
}
