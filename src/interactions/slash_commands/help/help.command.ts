import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { BOT_NAME } from '../../../config/config.json';

export = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command'),

    async execute(interaction: any, client: any) {
        let slashCommands = client.slashCommands; // Fetches Legacy commands

        const helpEmbed = new EmbedBuilder()
            .setTitle(`${BOT_NAME}'s Slash Commands`)
            .setColor('#ffffff')

        slashCommands.forEach((cmd: any) => {
            if (cmd.data.name === undefined) return;
            helpEmbed.addFields({
                name: `**/${cmd.data.name}**`,
                value: `${cmd.data.description}`
            });
        });

        return interaction.reply({
            embeds: [helpEmbed]
        });
    },
};