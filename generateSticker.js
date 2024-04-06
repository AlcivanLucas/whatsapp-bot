const {MessageMedia} = require ('whatsapp-web.js')
const fs = require('fs');
const config = require('./config.json');

export async function generateSticker (client){
    client.on('message', async (message) => {
        const isGroups = message.from.endsWith('@g.us') ? true : false;
        if ((isGroups && config.groups) || !isGroups) {
    
            // Bugs bot: texto to sticker, gif to sticker 

            // Image to sticker (Auto && Caption)
            // if ((message.type == "image" || message.type == "video" || message.type  == "gif") || (message._data.caption == `${config.prefix}figurinha`)) {
            if ((message.type == "image" ) && (message._data.caption == `${config.prefix}figurinha`)) {
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
}