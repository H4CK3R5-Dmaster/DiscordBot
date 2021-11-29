const { MessageEmbed } = require('discord.js');

module.exports = {
    name:'ping',
    description: "sends ping ",
    Perms: "ADMINISTRATOR",
    execute(client, interaction, arguments){
        const Response = new MessageEmbed()
        .setColor("GOLD")
        .setDescription(`${client.ws.ping}ms`);
        interaction.reply({embeds: [Response]});
    }
}