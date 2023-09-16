const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffles the queue"),
	run: async ({ client, interactionCreate }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Bro, det er ikke nok sanger for å få til en tilfeldig rekkefølge")

		queue.shuffle()
        await interactionCreate.editReply(`Køen av ${queue.tracks.length} sanger har blitt blandet!`)
	},
}
