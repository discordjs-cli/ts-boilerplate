import { SlashCommandBuilder } from 'discord.js';

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction: any) {
        const ping = `📈 Ping: ${Math.round(interaction.client.ws.ping)}ms`
        return interaction.reply(ping);
    },
};