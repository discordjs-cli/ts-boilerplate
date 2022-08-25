import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export = {
    name: "button",
    description: "Get a button",
    execute(message: any, args: any) {
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("blue_button")
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("🔶")
            );

        message.reply({
            content: "Here's a blue button for you!",
            components: [button]
        });
    }
};