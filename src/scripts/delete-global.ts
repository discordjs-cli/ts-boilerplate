// Deletes global commands
import { REST } from '@discordjs/rest';
import { Routes } from'discord.js';
import { CLIENT_ID, DEV_GUILD_ID, TOKEN } from '../config/config.ts';

async function deleteGlobal() {
    if (CLIENT_ID === '') {
        console.log('ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.ts');
        process.exit(2);
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
        .then(() => console.log('Successfully deleted global application commands.'))
        .catch(console.error);
}

deleteGlobal();
