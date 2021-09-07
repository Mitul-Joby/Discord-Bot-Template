const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'resetprefix',
    aliases: ['resetp','rprefix','rp'],
    description: 'Resets the bot\'s prefix to the default prefix.',
    usage: 'resetprefix',
	cooldown : 30,
	guildOnly: true,
	userPermissions: ['MANAGE_GUILD'],
	async execute(client, message, args) {
        await client.guildPrefixes.findOneAndRemove({guildID: message.guild.id});
        if (message.channel.permissionsFor(client.user).has('EMBED_LINKS')) {
            const prefixEmbed = new MessageEmbed()
            .setTitle('PREFIX RESETED')
            .setColor(client.EMBEDS.COLOURS.WHITE)
            .setDescription(`The prefix has been reset to **${client.prefix}**`)
            .setFooter('Reset By: ' + message.author.tag, message.author.displayAvatarURL({dynamic: true}));
            message.channel.send({embeds: [prefixEmbed]});
        } else {
            message.channel.send(`Server's prefix is reset **\`${client.prefix}\`**\nReset By: ${message.author.tag}`);
        }
        return;
    }
}
