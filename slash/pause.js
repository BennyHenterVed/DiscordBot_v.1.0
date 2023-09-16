const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Pauses the music"),
	run: async ({ client, interactionCreate }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interactionCreate.editReply("Det er ingen sanger her da gutta!")

		queue.setPaused(true)
        await interactionCreate.editReply("Musikken har blitt satt på pause! Bruk `/resume` for å starte igjen")
	},
}
