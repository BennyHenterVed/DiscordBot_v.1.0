const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ReactionUserManager, AutoModerationRuleEventType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("viser køen")
    .addNumberOption((option) => option.setName("page").setDescription("Side nummer i køen").setMinValue(1)),

    run: async ({ client, interactionCreate }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing){
            return await interactionCreate.editReply("Det er ingen sanger i køen")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interaction.options.getNumber("page") || 1) - 1

        if (page > totalPages) 
            return await interactionCreate.editReply(`Hva tenker du med? Det er bare totalt ${totalPages} sider med sanger`)
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interactionCreate.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Spiller nå**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**Queue**\n${queueString}`
                    )
                    .setFooter({
                        text: `Page ${page + 1} of ${totalPages}`
                    })
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}