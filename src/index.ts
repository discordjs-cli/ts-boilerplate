import {
    GatewayIntentBits,
    Client,
    Collection,
    ActivityType,
    Partials
} from 'discord.js';

import {
    TOKEN,
    PREFIX,
    LOG_CHANNEL,
    BOT_NAME,
    ACTIVITY,
    TYPE,
    STATUS
} from './config/config.json';

// Import Module Exports
import logready from 'logready';
import { logError } from './module_exports/error';

const client: any = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember
    ]
});

import fs from 'node:fs';
import path from 'node:path';

// Slash Command Handler
client.slashCommands = new Collection();
const slashCommandDir = fs.readdirSync(__dirname + "/interactions/slash_commands/");
for (const slashCommandPath of slashCommandDir) {
    const commandFiles =
        fs.readdirSync(__dirname + "/interactions/slash_commands/" + slashCommandPath)
            .filter(x => x.endsWith('.command.js'));

    var commandFile: string;

    for (commandFile of commandFiles) {
        const command = require(path.join(__dirname, "/interactions/slash_commands/" + slashCommandPath + "/" + `${commandFile}`));
        client.slashCommands.set(command.data.name, command);
    }
};

// Button Handler
client.buttonHandler = new Collection();
const buttonDirs = fs.readdirSync(__dirname + "/interactions/buttons");
for (const buttonPath of buttonDirs) {
    const buttonFiles =
        fs.readdirSync(__dirname + "/interactions/buttons/" + buttonPath)
            .filter(x => x.endsWith('.js'));

    var buttonFile: string;

    for (buttonFile of buttonFiles) {
        const button = require(path.join(__dirname, "interactions/buttons/" + buttonPath + "/" + `${buttonFile}`));
        client.buttonHandler.set(button.button_id, button);
    }
};

// Menu Handler
client.menuHandler = new Collection();
const menuDirs = fs.readdirSync(__dirname + "/interactions/menus");
for (const menuPath of menuDirs) {
    const menuFiles =
        fs.readdirSync(__dirname + "/interactions/menus/" + menuPath)
            .filter(x => x.endsWith('.js'));

    var menuFile: string;

    for (menuFile of menuFiles) {
        const menu = require(path.join(__dirname, "interactions/menus/" + menuPath + "/" + `${menuFile}`))
        client.menuHandler.set(
            `${menu.menu_id}%%${menu.menu_value}`,
            menu
        );
    }
};

// Legacy Command Handler
client.legacyCommands = new Collection();
const commandFiles =
    fs.readdirSync(path.join(__dirname, "interactions/legacy_commands"))
        .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, "interactions/legacy_commands", `${file}`));
    client.legacyCommands.set(command.name, command);
};


// Slash Command/Button/Menu event
client.on('interactionCreate', async (interaction: any) => {
    // Slash commands
    if (interaction.isChatInputCommand()) {

        const command =
            client.slashCommands.get(interaction.commandName); // Get commands

        // Return if no slash command is found
        if (command) {

            try {
                await command.execute(interaction, client);
            } catch (error: any) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command :/', ephemeral: true });

                // Log error in Logs channel
                logError(
                    client,
                    error,
                    LOG_CHANNEL,
                    "Slash"
                );
            };
        };
    };

    // Buttons
    if (interaction.isButton()) {

        // Fetch buttons with the same button ID
        const button =
            client.buttonHandler.get(interaction.customId); // Get button IDs

        // Return if no button is found
        if (button) {

            try {
                button.execute(interaction, client);
            } catch (error) {
                console.log(error);

                // Log error in Logs channel
                logError(
                    client,
                    error,
                    LOG_CHANNEL,
                    "Buttons"
                );
            };
        };
    };

    // Menus
    if (interaction.isSelectMenu()) {

        const menu =
            client.menuHandler.get(interaction.customId + "%%" + interaction.values[0]);

        if (menu) {

            try {
                menu.execute(interaction, client);
            } catch (error) {
                console.log(error);

                logError(
                    client,
                    error,
                    LOG_CHANNEL,
                    "Menus"
                );
            };
        };
    };
});

// Legacy Commands Message Event
client.on('messageCreate', (message: any) => {
    if (message.author.bot || !message.guild) return; // Return if author is a bot, or using DM's

    if (!message.content.startsWith(PREFIX)) return; // Ignore messages that don's start with the prefix

    let args = message.content.slice(PREFIX.length).split(' ');
    const commandName = args.shift().toLowerCase();

    // Fetch commands
    const command =
        client.legacyCommands.get(commandName) ||
        client.legacyCommands.find((cmd: any) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return; // Return if no command is found

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);

        // Log error in Logs channel
        logError(
            client,
            error,
            LOG_CHANNEL,
            "Legacy"
        );
    };
});

// Ready Event
client.on('ready', async () => {
    logready(BOT_NAME);

    // Set bot presence in ./config/config.json
    client.user.setPresence({
        activities: [
            {
                name: `${ACTIVITY}`,
                type: ActivityType[TYPE],

            }
        ], status: `${STATUS}` // Playing, Watching, Listening, Competing, Streaming
    });
});
// Set token in ./config/config.json
client.login(TOKEN);
