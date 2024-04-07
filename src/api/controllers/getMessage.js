
export async function getMessage(client) {
    // Listening to all incoming messages
    client.on('message_create', message => {
        // console.log(message.body);
        console.log(`o ${message.to} enviou ${message.body} para ${message.from}`)
    });
}


