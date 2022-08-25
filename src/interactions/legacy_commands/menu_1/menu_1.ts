import { ActionRowBuilder, SelectMenuBuilder } from 'discord.js';

export = {
	name: "menu",
	description: "Menu command",
	execute(message: any, args: any) {
		// Menu 1
		const menu = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		message.channel.send({ content: 'Message Menu Number One!', components: [menu] });
	}
};