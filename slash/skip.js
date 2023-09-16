const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song"),
	run: async ({ client, interactionCreate }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Det er ingen sanger i køen")

        const currentSong = queue.current

		queue.skip()
        await interactionCreate.editReply({
            embeds: [
                new EmbedBuilder().setDescription(`${currentSong.title} har blitt hoppet over!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}
