module.exports = {
	name: 'console',
	description: 'Sends a message on the console.',
	usage: 'console',
	async execute(client, message, args){
		console.log(args.join(' '));
		return;  
	},
};
