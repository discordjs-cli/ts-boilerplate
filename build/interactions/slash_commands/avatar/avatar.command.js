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
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('avatar') // Slash command name
        .setDescription('Get user avatar.') // Slash command description
        .addUserOption(option => option.setName('mention').setDescription('View a users avatar')),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = interaction.options.getUser('mention');
            if (user) { // If user is mentioned
                const avatarEmbed = new discord_js_1.EmbedBuilder()
                    .setAuthor({ name: `${user.username}'s Avatar` })
                    .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setColor(interaction.guild.members.cache.get(user.id).displayHexColor);
                return interaction.reply({
                    embeds: [avatarEmbed]
                });
            }
            ;
            // Default
            const avatarEmbed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}'s Avatar` })
                .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setColor(interaction.member.displayHexColor);
            return interaction.reply({
                embeds: [avatarEmbed]
            });
        });
    },
};
