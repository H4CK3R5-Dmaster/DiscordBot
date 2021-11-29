
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()){
            
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.followUp({content: "this command no longer exists."}) && client.command.delete(interaction.commandName);

            const arguments = [];
            for (let option of interaction.options.data) {
                if (option.type === 'SUB_COMMAND'){
                    option.options?.forEach((x) => {
                        if(x.value) arguments.push(option.value);
                    })
                } else if(option.value) arguments.push(option.value);
            };

            command.execute(client, interaction, arguments);
        }
    }

}