module.exports = {
    name: "ready",
    execute(client) {
        console.clear();
        console.log("=================================");
        console.log(" ");
        console.log(`${client.user.tag} is now online ! 🔥`);
        console.log(" ");
        console.log("=================================");
        client.user.setActivity("vous tous !", {type: "WATCHING"});
    }
    
}