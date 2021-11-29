const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports ={
    name: "ban",
    description: "ban a member",
    
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
            required: true,
        },
        {
            name:"messages",
            description: "choose on of the choices.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "don't delete any",
                    value: "0"
                },
                {
                    name: "previous 7 days",
                    value: "7"
                }
                
            ]
        },
    ],
    Perms: "BAN_MEMBERS",
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * 
     */
    execute(client, interaction, arguments) {
        const Target = interaction.options.getMember('target');

        if(Target.id === interaction.member.id){
            return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("tu ne peux pas te ban !")]})
        }

        if (Target.permissions.has('ADMINISTRATOR')){
            return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("tu ne peux pas ban un admin !")]})
        }
        const Reason = interaction.options.getString('reason');
        if (Reason.length > 512){
            return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("la raison ne doit pas dépasser 512 caractères !")]})
        }
        const Amount = interaction.options.getString('messages');
        Target.ban({days: Amount, reason: Reason})
        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setDescription(`**${Target.user.username}** a été banni du serveur ! raison: ${Reason}`)]})
    }
}