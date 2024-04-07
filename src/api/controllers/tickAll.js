const fs = require('fs');

async function tickAll(client){ 
    client.on('message_create', message => {
        if(message.body === "!tick_all"){
            client.sendMessage(message.from, `@⁨André Rocha⁩ @⁨Apollo ICEV⁩ @⁨Arthur Icev⁩ @⁨Bruno Icev⁩ @⁨Carlos Icev⁩ @⁨Conrado⁩ @⁨David Icev⁩ @⁨Enzo Icev⁩ @⁨Félix⁩ @⁨Gabriel Lages Icev⁩ @⁨Guilherme 💎⁩ @⁨Heitor Viana⁩ @⁨Ingrid Ribeiro⁩ @⁨Ives⁩ @⁨João Emannuel⁩ @⁨João Filho⁩ @⁨João Neto Icev⁩ @⁨João Vítor Icev⁩ @⁨Julia⁩ @⁨Kevilla Icev⁩ @⁨Lauan Vascão⁩ @⁨Luís Icev⁩ @⁨Luis Victor Icev⁩ @⁨Matheus 🇧🇷⁩ @⁨Meu Prefeito⁩ @⁨Mickael⁩ @⁨Pedro Vitor⁩ @⁨Santana⁩ @⁨Victor Cerqueira Icev⁩ @⁨Victor Icev⁩ @⁨Wendril Gabriel 2⁩ @⁨~Guilherme T Silva⁩ @⁨~L.Pires⁩ @⁨+55 86 8180-9866⁩ @⁨+55 86 8807-3589⁩ @⁨+55 86 8816-8572⁩ @⁨+55 86 8885-1444⁩ @⁨+55 86 9483-2401⁩ @⁨+55 86 9585-5963⁩ @⁨+55 86 9901-2844⁩ @⁨+55 86 9947-2553⁩`)
        }
    });
}

module.exports = tickAll;