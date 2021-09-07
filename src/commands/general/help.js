const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	aliases: ['h','support','assist'],
	description: 'Gives list of available commands or information regarding a particular category/command.',
	usage: 'help (category-name|command-name)',
	botPermissions : ['EMBED_LINKS'],
	async execute(client, message, args) {
		
		const helpEmbed = new MessageEmbed()
		.setColor(client.EMBEDS.COLOURS.HELP)
		.setThumbnail(client.EMBEDS.THUMBNAILS.HELP)
		.setFooter('Requested By: ' + message.author.tag, message.author.displayAvatarURL({dynamic: true}));
	
		if (!args[0]) {
			helpEmbed.setTitle('COMMAND GUIDE');
			helpEmbed.setDescription(`**Command Prefix**: \`${client.prefix}\``);
			for (let category of client.categories) {
				if (!category.commands[0]) continue;
				if (category.devMode && !client.developers.IDS.includes(message.author.id)) continue;
				let commandList = '';
				for (let cmd of category.commands) {
					commandList += cmd.name + ' ';
				}
				helpEmbed.addField(`${category.emoji} ${category.name.toUpperCase()}`,category.description + '```' + commandList + '```');
			}
			message.channel.send({ embeds: [helpEmbed] });
		} 
		else {

            for (let category of client.categories) {
				if (!category.commands[0]) continue;
				if (category.devOnly && !client.developers.includes(message.author.id)) continue;
				if (category.name.toLowerCase() == args.join(' ').toLowerCase() || (category.aliases && category.aliases.includes(args.join(' ').toLowerCase())) ) {
					var categoryHelp = category;
					break;
				}
			}

            if (categoryHelp) {
				helpEmbed.setTitle(`${categoryHelp.name.toUpperCase()} ${categoryHelp.emoji}`);
				if (categoryHelp.description)
					helpEmbed.setDescription(`${categoryHelp.description}`);
				for (let cmd of categoryHelp.commands) {
					helpEmbed.addField(cmd.name,cmd.description);
				}
				message.channel.send({embeds: [helpEmbed]});
			} else {
				for (let category of client.categories) {
                    if (category.devOnly && !client.developers.includes(message.author.id)) continue;
					for (let cmd of category.commands) {
						if ( cmd.name.toLowerCase() == args.join(' ').toLowerCase() || (cmd.aliases && cmd.aliases.includes(args.join(' ').toLowerCase())) ){
							var command = cmd; 
							break;
						}
					}
				}

				if (command) {
					helpEmbed.setTitle('COMMAND: '+command.name.toUpperCase());
					if (command.description)
						helpEmbed.addField('DESCRIPTION',command.description);
					if (command.usage)
						helpEmbed.addField('USAGE','```'+client.prefix+command.usage+'```');
					if (command.aliases)
						helpEmbed.addField('ALIASES','```'+command.aliases.join(' ')+'```');
					if (command.guildOnly)
						helpEmbed.addField('GUILD ONLY','This command can only be used in discord servers/guilds.');	
					if(command.cooldown)
						helpEmbed.addField('COOLDOWN','`'+command.cooldown+'` seconds');	
					if (command.userPermissions)
						helpEmbed.addField('USER PERMISSIONS REQUIRED','```'+command.userPermissions.join(' ')+'```');		
					message.channel.send({embeds: [helpEmbed]});
				}
				else {
					message.channel.send('Command/Category not found');
				}
			}
		}
		return;  
	},
};
