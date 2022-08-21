"use strict";
const discord_js_1 = require("discord.js");
module.exports = {
    name: "row",
    description: "Row of buttons",
    execute(client, message, args) {
        const rowDemo = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId("row_demo1")
            .setLabel("Primary")
            .setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
            .setCustomId("row_demo2")
            .setLabel("Secondary")
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setCustomId("row_demo3")
            .setLabel("Success")
            .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
            .setCustomId("row_demo4")
            .setLabel("Danger")
            .setStyle(discord_js_1.ButtonStyle.Danger), new discord_js_1.ButtonBuilder()
            .setLabel('Link')
            .setURL("https://discordjs.guide/")
            .setStyle(discord_js_1.ButtonStyle.Link));
        message.channel.send({
            components: [rowDemo],
            content: "Here's a row of buttons for you!"
        });
    }
};
