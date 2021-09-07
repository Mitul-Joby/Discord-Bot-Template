const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'invite',
    aliases:['inv','botinvite','addbot','bot'],
    usage: 'botinvite',
    description: 'Sends Bot\'s invite link.',
    async execute(client, message, args) {
        const inviteRow = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle('LINK')
            .setLabel('INVITE ME!')
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=applications.commands%20bot`),

            new MessageButton()
            .setStyle('LINK')
            .setLabel('SUPPORT SERVER')
            .setURL(`https://discord.gg/`) // Update to requirement
        );
        const inviteEmbed = new MessageEmbed()
        .setTitle(`Hey there ${message.author.username}!`)
        .setDescription('Invite me to your server using the button below!')
        .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
        .setFooter('Requested By: ' + message.author.tag, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send({ embeds: [inviteEmbed], components: [inviteRow] }); 
        return;
    }
}