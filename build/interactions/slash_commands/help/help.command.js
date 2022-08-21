"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const discord_js_1 = require("discord.js");
const config_json_1 = require("../../../config/config.json");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let slashCommands = client.slashCommands; // Fetches Legacy commands
            const helpEmbed = new discord_js_1.EmbedBuilder()
                .setTitle(`${config_json_1.BOT_NAME}'s Slash Commands`)
                .setColor('#ffffff');
            slashCommands.forEach((cmd) => {
                if (cmd.data.name === undefined)
                    return;
                helpEmbed.addFields({
                    name: `**/${cmd.data.name}**`,
                    value: `${cmd.data.description}`
                });
            });
            return interaction.reply({
                embeds: [helpEmbed]
            });
        });
    },
};
