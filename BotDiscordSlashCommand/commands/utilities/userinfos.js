const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const moment = require('moment');


module.exports = {
    name:"info",
    description: "display the mentioned member's infos",
    options: [
        {
            name: "target",
            description: "Selectionne une target",
            type: "USER",
            required: true
        },
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * 
     */
    execute( client, interaction, arguments){
        const target = interaction.options.getMember('target');
        const Responses = new MessageEmbed()
        .setAuthor(`${target.user.username}`, target.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
        .setColor('NOT_QUITE_BLACK')
        .addField("userID", `${target.user.id}`, false)
        .addField("Roles", `${target.roles.cache.map(r => r).join(' ')}`)
        .addField("Server Member Since", `${moment(target.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(target.joinedAt).startOf('day').fromNow()}`)
        .addField("Discord user Since", `${moment(target.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(target.user.createdAt).startOf('day').fromNow()}`)
        interaction.reply({embeds: [Responses]})
    }
}