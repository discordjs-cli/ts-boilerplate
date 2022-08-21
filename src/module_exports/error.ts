// Import
import { EmbedBuilder} from 'discord.js';

// Error Logger
export function logError(client: any, error: any, channel_id: string, type = "Legacy/Slash/Button/Menu") {

    if (client.channels.cache.get(channel_id) === undefined) return; // Return if no channel is provided

    try {
        const errorEmbed = new EmbedBuilder()
            .setTitle('Terminal')
            .setAuthor({ name: `${type} Commands` })
            .setColor('#000000')
            .setDescription("```" + `ERROR: ${error}` + "```")
            .setTimestamp()

        client.channels.cache.get(channel_id)
            .send({
                embeds: [errorEmbed]
            })
            .catch((err: any) => console.log(err));
    } catch (err) {
        console.log(err)
    };
};