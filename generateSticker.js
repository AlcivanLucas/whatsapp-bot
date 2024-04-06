const {MessageMedia} = require ('whatsapp-web.js')

export async function generateSticker (client){

    const generateSticker = async (msg, sender) => {
        if(msg.type === "image") {
            try {
                const { data } = await msg.downloadMedia()
                const image = await new MessageMedia("image/jpeg", data, "image.jpg")
                await client.sendMessage(sender, image, { sendMediaAsSticker: true })
            } catch(e) {
                msg.reply("❌ Erro ao processar imagem")
            }
        } else {
            try {
    
                const url = msg.body.substring(msg.body.indexOf(" ")).trim()
                const { data } = await axios.get(url, {responseType: 'arraybuffer'})
                const returnedB64 = Buffer.from(data).toString('base64');
                const image = await new MessageMedia("image/jpeg", returnedB64, "image.jpg")
                await client.sendMessage(sender, image, { sendMediaAsSticker: true })
            } catch(e) {
                msg.reply("❌ Não foi possível gerar um sticker com esse link")
            }
        }
    }


}