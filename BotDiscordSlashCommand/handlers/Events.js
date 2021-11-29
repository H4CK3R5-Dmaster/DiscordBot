
const { readdirSync } = require('fs');

module.exports = (client) => {
    const eventfolders = readdirSync('./events');
    for (const folder of eventfolders){
        const eventfiles = readdirSync(`./events/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of eventfiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once){
                client.once(event.name, (...args) => event.execute(...args, client));
            }else{
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}