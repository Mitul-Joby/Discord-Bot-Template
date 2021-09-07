/*
	A discord bot template. 
	Author: Mitul Joby
*/

console.clear();
const fs = require('fs');
if (fs.existsSync('config/config.json')) {
	var { DEVELOPERS, TOKEN, PREFIX, MONGODBURL, APIKEYS } = require('../config/config.json'); 
} else if ( (process.env.DEVIDS) && (process.env.DEVNAMES) && (process.env.TOKEN)  && (process.env.PREFIX) && (process.env.MONGODBURL)){
	var { TOKEN, PREFIX, MONGODBURL } = process.env;
    var DEVELOPERS = new Object();
	DEVELOPERS.IDS     = process.env.DEVIDS.split(',');
	DEVELOPERS.NAMES   = process.env.DEVNAMES.split(',');
	var APIKEYS = new Object();
    // ADD API KEYS IF PLANS ON USING ENV VARIABLES | EX: APIKEYS.API1 = process.env.API1
} else {
	console.error('Missing required configuration variables, check config.json file in config or add to environment variables.');
	process.exit(1);
}

if (fs.existsSync('config/embeds.json')) {
	var EMBEDS = require('../config/embeds.json'); 
} else {
	console.error('Missing embeds.json file in config.');
	process.exit(1); 
}

const mongoose = require('mongoose');
mongoose.connect(MONGODBURL).then(console.log('\x1b[32mBot has successfully connected to mongoDB!\x1b[0m'));

const { Client, Collection, Intents } = require('discord.js');
const intents = [Intents.FLAGS.GUILDS, 
				 Intents.FLAGS.GUILD_MEMBERS,
				 Intents.FLAGS.GUILD_BANS,
				 Intents.FLAGS.GUILD_MESSAGES, 
				 Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				 Intents.FLAGS.DIRECT_MESSAGES,
				 Intents.FLAGS.DIRECT_MESSAGE_REACTIONS];
const client = new Client({ intents: intents }); // Add necessary Intents

client.guildPrefixes = require('./models/guildPrefixes');
client.developers = DEVELOPERS;
client.prefix     = PREFIX;
client.APIKEYS    = APIKEYS;
client.EMBEDS     = EMBEDS;
client.cooldowns  = new Collection();

client.categories = [];
const commandFolders = fs.readdirSync('./src/commands');
for (const folder of commandFolders) {
	if (folder.toLowerCase() == 'template') continue;
	var category = new Object;
	if (fs.existsSync(`src/commands/${folder}/!about.json`)) {
		category = require(`./commands/${folder}/!about.json`);
	} else {
		console.log(`./commands/${folder} missing !about.json`); 
        continue;
	}
    const commands = [], commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`); commands.push(command);
	}
    category.commands = commands;
    category.devMode = (folder.toLowerCase() == 'testing') ? true : false;
	client.categories.push(category);
}
client.categories.sort((a, b) => (a.priority > b.priority) ? 1 : -1 );

client.on('warn', async warning => {
	console.log(warning);
});

client.on('error', async error => {
	console.error(error);
});

client.once('ready', () => {
	console.log(`\x1b[32m${client.user.tag} with ID: ${client.user.id} ready at ${client.readyAt}\x1b[0m`);
	console.log(`Default Bot prefix is ${client.prefix}`);
	client.user.setActivity('you!', { type: 'LISTENING'});
});

client.on('messageCreate', async message => {
	
    if (message.author.bot || message.author.system) return;

    if (message.guild) {
        var customPrefixData = await client.guildPrefixes.findOne({ guildID: message.guild.id }); 
    }
	const prefix = (customPrefixData) ? customPrefixData.prefix : client.prefix;

	if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
        return message.channel.send(`${prefix}help for help on my commands!`);
    } 
	
    if (!message.content.startsWith(prefix)) return;
	
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
        // If required, send a message to owner/author for perm fix.
        return;
    } 

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	for (let category of client.categories) {
		if (category.devMode && !client.developers.IDS.includes(message.author.id)) continue;
		for (let cmd of category.commands) {
			if (commandName == cmd.name || (cmd.aliases && cmd.aliases.includes(commandName))) {
				var command = cmd;
			}
		}
	}

	if (!command) {
		return message.reply('Sorry, that\'s an invalid command!');
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs, try again in a server!');
	}

	if (command.userPermissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.userPermissions)) {
			return message.reply('You do not have permission to do this!');
		}
	}
	if (command.botPermissions) {
		const botPerms = message.channel.permissionsFor(client.user);
		if (!botPerms || !botPerms.has(command.botPermissions)) {
			return message.reply('I do not have permission to do this!');
		}
	}

    if (command.cooldown) {
        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = command.cooldown * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
	
	try { command.execute(client, message, args); }
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
    
    return;

});

client.login(TOKEN);
