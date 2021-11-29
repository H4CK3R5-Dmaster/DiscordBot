const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "unmute",
    description: "unmute a member",
    Perms: "ADMINISTRATOR",
    options: [
        {
            name:"target",
            description: "select a member",
            type: "USER",
            required: true
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * 
     */
    execute(client, interaction, arguments) {
        const Target = interaction.options.getMember('target');

        if (!Target.roles.cache.has(/*"roleId mute"*/)){
            return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("ce membre n'est pas mute")]});
        }

        Target.roles.remove(/*"roleId mute"*/)
        Target.roles.add(/*"roleId membre"*/)

        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setDescription(`${Target} a été unmute`)]});

    }
}