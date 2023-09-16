const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("Stops the bot and clears the queue"),
	run: async ({ client, interactionCreate }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interactionCreate.editReply("Det er ingen sanger i køen")

		queue.destroy()
        await interactionCreate.editReply("Snakkes gutta!")
	},
}
