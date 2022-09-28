// Deletes guild commands
import { REST } from '@discordjs/rest';
import { Routes } from'discord.js';
import { CLIENT_ID, DEV_GUILD_ID, TOKEN } from '../config/config.ts';

async function deleteDev() {
    if (CLIENT_ID === '') {
        console.log('ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.ts');
        process.exit(2);
    }

    if (DEV_GUILD_ID === '') {
        console.log('ERROR: No guild ID provided. Please provide a valid guild ID in ./config/config.ts');
        process.exit(2);
    }

    const rest = await new REST({ version: '10' }).setToken(TOKEN);

    await rest
        .put(Routes.applicationGuildCommands(CLIENT_ID, DEV_GUILD_ID), { body: [] })
        .then(() => console.log('Successfully deleted dev application commands.'))
        .catch(console.error);
}

deleteDev();
