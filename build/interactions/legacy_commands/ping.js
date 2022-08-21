"use strict";
module.exports = {
    name: "ping",
    aliases: ["p", "pong"],
    description: "Ping",
    execute(client, message, args) {
        const ping = `📈 Ping: ${Math.round(message.client.ws.ping)}ms`;
        message.reply(ping);
    }
};
