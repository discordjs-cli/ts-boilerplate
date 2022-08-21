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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config/config.json");
// Import Module Exports
const ready_1 = require("./module_exports/ready");
const error_1 = require("./module_exports/error");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ],
    partials: [
        discord_js_1.Partials.User,
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Message,
        discord_js_1.Partials.GuildMember
    ]
});
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// Slash Command Handler
client.slashCommands = new discord_js_1.Collection();
const slashCommandDir = node_fs_1.default.readdirSync(__dirname + "/interactions/slash_commands/");
for (const slashCommandPath of slashCommandDir) {
    const commandFiles = node_fs_1.default.readdirSync(__dirname + "/interactions/slash_commands/" + slashCommandPath)
        .filter(x => x.endsWith('.command.js'));
    var commandFile;
    for (commandFile of commandFiles) {
        const command = require(node_path_1.default.join(__dirname, "/interactions/slash_commands/" + slashCommandPath + "/" + `${commandFile}`));
        client.slashCommands.set(command.data.name, command);
    }
}
;
// Button Handler
client.buttonHandler = new discord_js_1.Collection();
const buttonDirs = node_fs_1.default.readdirSync(__dirname + "/interactions/buttons");
for (const buttonPath of buttonDirs) {
    const buttonFiles = node_fs_1.default.readdirSync(__dirname + "/interactions/buttons/" + buttonPath)
        .filter(x => x.endsWith('.js'));
    var buttonFile;
    for (buttonFile of buttonFiles) {
        const button = require(node_path_1.default.join(__dirname, "interactions/buttons/" + buttonPath + "/" + `${buttonFile}`));
        client.buttonHandler.set(button.button_id, button);
    }
}
;
// Menu Handler
client.menuHandler = new discord_js_1.Collection();
const menuDirs = node_fs_1.default.readdirSync(__dirname + "/interactions/menus");
for (const menuPath of menuDirs) {
    const menuFiles = node_fs_1.default.readdirSync(__dirname + "/interactions/menus/" + menuPath)
        .filter(x => x.endsWith('.js'));
    var menuFile;
    for (menuFile of menuFiles) {
        const menu = require(node_path_1.default.join(__dirname, "interactions/menus/" + menuPath + "/" + `${menuFile}`));
        client.menuHandler.set(`${menu.menu_id}%%${menu.menu_value}`, menu);
    }
}
;
// Legacy Command Handler
client.legacyCommands = new discord_js_1.Collection();
const commandFiles = node_fs_1.default.readdirSync(node_path_1.default.join(__dirname, "interactions/legacy_commands"))
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(node_path_1.default.join(__dirname, "interactions/legacy_commands", `${file}`));
    client.legacyCommands.set(command.name, command);
}
;
// Slash Command/Button/Menu event
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    // Slash commands
    if (interaction.isChatInputCommand()) {
        const command = client.slashCommands.get(interaction.commandName); // Get commands
        // Return if no slash command is found
        if (command) {
            try {
                yield command.execute(interaction, client);
            }
            catch (error) {
                console.error(error);
                yield interaction.reply({ content: 'There was an error while executing this command :/', ephemeral: true });
                // Log error in Logs channel
                (0, error_1.logError)(client, error, config_json_1.LOG_CHANNEL, "Slash");
            }
            ;
        }
        ;
    }
    ;
    // Buttons
    if (interaction.isButton()) {
        // Fetch buttons with the same button ID
        const button = client.buttonHandler.get(interaction.customId); // Get button IDs
        // Return if no button is found
        if (button) {
            try {
                button.execute(interaction, client);
            }
            catch (error) {
                console.log(error);
                // Log error in Logs channel
                (0, error_1.logError)(client, error, config_json_1.LOG_CHANNEL, "Buttons");
            }
            ;
        }
        ;
    }
    ;
    // Menus
    if (interaction.isSelectMenu()) {
        const menu = client.menuHandler.get(interaction.customId + "%%" + interaction.values[0]); // Gets menu
        // Return if no menus
        if (menu) {
            try {
                menu.execute(interaction, client);
            }
            catch (error) {
                console.log(error);
                // Log error in Logs channel
                (0, error_1.logError)(client, error, config_json_1.LOG_CHANNEL, "Menus");
            }
            ;
        }
        ;
    }
    ;
}));
// Legacy Commands Message Event
client.on('messageCreate', (message) => {
    if (message.author.bot || !message.guild)
        return; // Return if author is a bot, or using DM's
    if (!message.content.startsWith(config_json_1.PREFIX))
        return; // Ignore messages that don's start with the prefix
    let args = message.content.slice(config_json_1.PREFIX.length).split(' ');
    const commandName = args.shift().toLowerCase();
    // Fetch commands
    const command = client.legacyCommands.get(commandName) ||
        client.legacyCommands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command)
        return; // Return if no command is found
    try {
        command.execute(client, message, args);
    }
    catch (error) {
        console.log(error);
        // Log error in Logs channel
        (0, error_1.logError)(client, error, config_json_1.LOG_CHANNEL, "Legacy");
    }
    ;
});
// Ready Event
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, ready_1.ready)(config_json_1.BOT_NAME);
    // Set bot presence in ./config/config.json
    client.user.setPresence({
        activities: [
            {
                name: `${config_json_1.ACTIVITY}`,
                type: discord_js_1.ActivityType[config_json_1.TYPE],
            }
        ], status: `${config_json_1.STATUS}` // Playing, Watching, Listening, Competing, Streaming
    });
}));
// Set token in ./config/config.json
client.login(config_json_1.TOKEN);
