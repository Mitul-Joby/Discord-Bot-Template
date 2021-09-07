const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'hello',
	aliases: ['hi', 'hey', 'hallo', 'sup'],
	description: 'Relpies back with hi',
	usage: 'hello',
	async execute(client, message, args) {
		if (message.channel.permissionsFor(client.user).has('EMBED_LINKS')) {
			var helpEmbed = new MessageEmbed()
				.setColor(client.EMBEDS.COLOURS.HELLO)
				.setTitle('Hello ' + message.author.username)
				.setDescription(`I'm ${client.user.username}!\nHow can I help you?`)
				.setThumbnail(client.EMBEDS.THUMBNAILS.HELLO)
			message.channel.send({embeds: [helpEmbed]});	
		} else {
			message.channel.send(`Hello ${message.author.username}! \nI'm ${message.client.user.username}! How can I help you?`);
		}
		return;  	
	},
};
