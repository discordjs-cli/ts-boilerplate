export = {
    button_id: "row_demo1",
    description: "Row Demo Buttons",
    async execute(interaction: any) {
        return interaction.reply({
            content: 'Clicked!',
            ephemeral: true // Visible to the clicker only
        });
    }
};