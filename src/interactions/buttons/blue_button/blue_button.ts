export = {
    button_id: "blue_button", // Button ID
    description: "A blue button", // Button Description
    async execute(interaction: any) {
        return interaction.reply('The blue button was clicked!');
    }
};