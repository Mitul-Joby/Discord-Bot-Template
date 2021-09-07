const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'customprefix',
    aliases: ['setprefix','setpre','cstmprefix','cprefix','cpre'],
    description: 'Sets a custom prefix for the bot, for the current discord server.',
	usage: 'customprefix <prefix>',
	cooldown : 30,
	guildOnly: true,
	userPermissions: ['MANAGE_GUILD'],
	async execute(client, message, args) {
        if(!args[0]) return message.reply('Please provide a new prefix!');
        if(args[0].length > 5) return message.reply('The new prefix can not be greater than 5 characters!');   
        await client.guildPrefixes.findOneAndRemove({guildID: message.guild.id});
        let newPrefixData = new client.guildPrefixes({prefix: args[0], guildID: message.guild.id});
        newPrefixData.save()
        .then(() => {
            if (message.channel.permissionsFor(client.user).has('EMBED_LINKS')) {
                const prefixEmbed = new MessageEmbed()
                .setTitle('NEW CUSTOM PREFIX SET')
                .setColor(client.EMBEDS.COLOURS.WHITE)
                .setDescription(`The new prefix is **\`${newPrefixData.prefix}\`**`)
                .setFooter('Set By: ' + message.author.tag, message.author.displayAvatarURL({dynamic: true}));
                message.channel.send({embeds: [prefixEmbed]});
            } else {
                message.channel.send(`Server's new custom prefix is **\`${newPrefixData.prefix}\`**\nSet By: ${message.author.tag}`);
            }
        });
        return;
    }
}
