const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);

module.exports = async (client) => {
    const commandFiles = await globPromise(`${process.cwd()}/commands/*/*.js`)

    commandArry = [];

    commandFiles.map(async (commandFiles) => {
        const command = await require(commandFiles);

        if(!command.name) return;
        if(command.Perms) command.defaultPermission = false;
        const C = commandFiles.split("/");
        console.log(`loaded` + command.name.toUpperCase() + `${C[C.length - 2 ]}`);

        await client.commands.set(command.name, command);
        commandArry.push(command);
    })
    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get(/*"Id du serveur"*/);

        MainGuild.commands.set(commandArry).then((command)=>{
            const Roles = (commandName) => {
                const cmdPerms = commandArry.find((C) => C.name === commandName).Perms;
                if(!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms) && !r.managed);
            };

            const fullPermissions = command.reduce((accumulator, x) => {
                const roles = Roles(x.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, v) => {
                    return [...a, {id: v.id, type: "ROLE", permission: true}]
                }, []);

                return [...accumulator, {id: x.id, permissions}]
            }, []);

            MainGuild.commands.permissions.set({ fullPermissions });
        })
    })
}