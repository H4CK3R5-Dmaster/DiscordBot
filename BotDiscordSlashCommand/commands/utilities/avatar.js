const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: "avatar",
    description: "display the mentioned user's avatar",
    options: [
        {
            name: "target",
            description: "Selectionne une target",
            type: "USER",
            required: true
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * 
     */
    execute(client, interaction, arguments){
        const target = interaction.options.get('target');

        const Respons = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${target.user.tag} Avatar`)
        .setImage(target.user.displayAvatarURL({dynamic: true}))
        .setFooter(`Requested By ${interaction.user.tag}`)

        interaction.reply({embeds: [Respons]});
    }
}