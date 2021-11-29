const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    description: "clears messages",
    
    options: [
        {
            name:"amount",
            description: "provide the amount of messages you want to delete",
            type: "NUMBER",
            required: true,
        },
        {
            name:"target",
            description: "select a target to clear their messages. ",
            type: "USER",
            required: false,
        },
    ],
    Perms:"ADMINISTRATOR",
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * 
     */
    async execute(client, interaction, arguments){
        const Amount = interaction.options.getNumber('amount');
        const Target = interaction.options.getMember('target');
        const Channel = interaction.channel;
        const Messages = Channel.messages.fetch();

        if (Target){
            const TargetMessages = (await Messages).filter((m) => m.author.id === Target.id);
            await Channel.bulkDelete(TargetMessages, true);
            interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setDescription(`${Amount} messages de ${Target} ont été supprimé !`)]})

        } else {
            Channel.bulkDelete(Amount, true);
            interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setDescription(`${Amount} ont été supprimé du ${Channel} !`)]})
        }
    }
}