const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Gives bot\'s ping',
	usage: 'ping',
	async execute(client, message, args){
		if (message.channel.permissionsFor(client.user).has('EMBED_LINKS')) {
			var PING = message.client.EMBEDS.PING;
			var pingEmbed = new MessageEmbed()
			.setColor(client.EMBEDS.COLOURS.PING)
			.setTitle('PING PONG')
			.setDescription('Bot Ping :```'+client.ws.ping+'```')
			.setThumbnail(client.EMBEDS.THUMBNAILS.PING)
			.setFooter("Requested by user: " + message.author.tag, message.author.displayAvatarURL({size: 4096, dynamic: true }));
			message.channel.send({embeds: [pingEmbed]});
		} else {
			message.channel.send(`Ping pong! Bot ping is \`${client.ws.ping}\`!`);
		}
		return;  
	},
};
