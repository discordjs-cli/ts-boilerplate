export = {
    menu_id: "select", // Menu ID
    menu_value: "first_option", // Menu value
    description: "Option 1 of menu 1", // Menu Description
    async execute(interaction: any) {
        return interaction.reply({ content: 'Thing one was selected from menu one!', components: [], ephemeral: true });
    }
};