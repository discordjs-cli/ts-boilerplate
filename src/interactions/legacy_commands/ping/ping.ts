export = {
    name: "ping", // command name
    aliases: ["p", "pong"], // Alternate command name(s)
    description: "Ping", // Command description
    execute(message: any, args: any) {
        const ping = `📈 Ping: ${Math.round(message.client.ws.ping)}ms`
        message.reply(ping);
    }
};