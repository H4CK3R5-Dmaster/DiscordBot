
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: "mute",
    description: "mute a member",
    Perms: 'ADMINISTRATOR',
    options: [
        {
            name:"target",
            description: "select a member",
            type: "USER",
            required: true,
        },
        {
            name:"reason",
            description: "provide a reason ",
            type: "STRING",
            required: false,
        },
        {
            name:"preset-time",
            description: "select a pre set time ! ",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "5 heures",
                    value: "5h"
                },
                {
                    name: "1 heure",
                    value: "1h"
                },
                
                {
                    name: "1 jour",
                    value: "1d"
                },
                {
                    name: "7 jours",
                    value: "7d"
                },
                
            ]
        },

        {
            name: "custom-time",
            description: "provide a custom time (5h/1h/1d/7d) ",
            type: "STRING",
            required: false,
            
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * 
     */
    async execute(client, interaction, arguments){
        const Target = interaction.options.getMember('target');
        const Reason = interaction.options.getString("reason") || "No reason specified";
        const Time = interaction.options.getString('preset-time') || interaction.options.getString('custom-time');

        if (!interaction.guild.roles.cache.get(/*"roleId mute"*/)){
            return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("le role mute n'existe pas ")]})
        }

        await Target.roles.remove(/*"roleId a sup si besoin"*/);
        await Target.roles.add(/*"roleId mute a add"*/);

        setTimeout(async () => {
            if (!Target.roles.cache.has(/*"roleId mute"*/)) return;
            await Target.roles.remove(/*"roleId mute"*/);
            await Target.roles.add(/*"add le roleId membre si besoin"*/);
        }, (ms(Time)))

        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setDescription(`${Target} a bien été mute pendant ${Time} | ||${Target.id}|| raison : ${Reason}`)]})
    }


}