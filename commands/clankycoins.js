const {ClankyCoins} = require('../dbInit');
module.exports = {
	name: 'clankycoins',
	description: 'Coins from clanky',

	async execute(message, args) {


		if (args.length<1){
					try {
						// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
						const cc = await ClankyCoins.create({
							user_id: message.author.id,
							username: message.author.username,
							tag:message.author.tag,
							coins:0
						});


				return message.reply( cc.tag + ' added to the Clanky Coin Ledger');
				}
			catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return message.reply("You are already collecting coins");
					}
					console.log(e);
				return message.reply('Something went wrong with adding a user to the clanky coins ledger.');
			}
		}


		if (message.member.roles.cache.find(role => role.name === 'Commissioner')) {
			console.log("Is Commish");
			if (args.length>2){
					const user = await ClankyCoins.findOne({ where: { user_id: args[1] } });
					console.log(user);
					if (args[0]=="add"){
						console.log("add");
						const incrementResult = await user.increment('coins', { by: parseInt(arg[2]) });
						return message.reply(user.user_id + ' now has a coin total of ' + user.coins);
					}
					if (args[0]=="remove"){
						console.log("remove");
						const incrementResult = await user.decrement('coins', { by: parseInt(arg[2])});
						return message.reply(user.user_id + ' now has a coin total of ' + user.coins);
					}
				}
					}
}


,};
