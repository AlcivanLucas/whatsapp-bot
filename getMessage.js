
export function getMessage(client) {
    // Listening to all incoming messages
    client.on('message_create', message => {
        console.log(message.body);
    });
}

