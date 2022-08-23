import { EmbedBuilder } from 'discord.js';
import { BOT_NAME, PREFIX } from '../../config/config.json';

module.exports = {
    name: "help",
    description: "Help command",
    execute(client, message, args) {
        let legacyCommands = client.legacyCommands; // Fetches Legacy commands

        const helpEmbed = new EmbedBuilder()
            .setTitle(`${BOT_NAME}'s Legacy Commands`) // Bot name
            .setColor('#000') // Hex code [three characters can be used if sets of two exist; #bbaaee could be #bae]

        legacyCommands.forEach((cmd: any) => {
            helpEmbed.addFields({
                name: `**${PREFIX}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ''}**`,
                value: `${cmd.description}`
            })
        });
        message.channel.send({
            embeds: [helpEmbed]
        })

    }
};