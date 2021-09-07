const Discord = require('discord.js');
module.exports = {
	name: 'name',
	aliases: ['alias1', 'alias2'],
	description: 'description',
	usage: '[command name] [arg1]',
	cooldown : false,       // OPTIONAL : seconds 
	guildOnly: false, 	// OPTIONAL : true|false
	userPermissions: false, // OPTIONAL : List of permissions EX: ['ADMINISTRATOR']
	botPermissions : false, // OPTIONAL : List of permissions EX: ['ADMINISTRATOR']
	async execute(client, message, args){
		return;  
	},
};
