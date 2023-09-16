const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Resumes the music"),
	run: async ({ client, interactionCreate }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interactionCreate.editReply("Dt er ikke flere sanger i køen")

		queue.setPaused(false)
        await interactionCreate.editReply("Musikken har blitt satt på pause! Bruk `/pause` for å start musikken igjen")
	},
}
