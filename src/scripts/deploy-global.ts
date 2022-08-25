// Run this file to deploy new commands globally
import fs from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { CLIENT_ID, DEV_GUILD_ID, TOKEN } from '../config/config.json';

async function deployGlobal() {
    if (CLIENT_ID === '') {
        console.log('ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.json');
        process.exit();
    }

    const commands = [];

    var currentDir: any = __dirname.split('/');
    currentDir.pop();
    currentDir = currentDir.join('/');

    const slashCommandDir = fs.readdirSync(currentDir + '/interactions/slash_commands/');
    for (const slashCommandPath of slashCommandDir) {
        const commandFiles = fs.readdirSync(currentDir + '/interactions/slash_commands/' + slashCommandPath).filter((x) => x.endsWith('.command.js'));

        for (var commandFile of commandFiles) {
            const command = require(path.join(currentDir, '/interactions/slash_commands/' + slashCommandPath + '/' + `${commandFile}`));
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
        .then(() => console.log('Successfully registered global application commands.'))
        .catch(console.error);
}

deployGlobal();
