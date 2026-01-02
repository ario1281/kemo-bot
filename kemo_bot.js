const Discord = require('discord.js');
const { prefix } = require('./config.json');
let emb = {embed:{
		"title":""
	}
};

const client = new Discord.Client();

// 初期化
client.once('ready', async () => {
	console.log('ケモ耳ちゃん準備完了じゃ');
});

// Message
client.on('message', async msg => {
	if(msg.author.id == client.user.id || msg.author.bot) { return; }
	if(msg.content === `${prefix}help`) {
		msg.channel.send('説明じゃ');
	}
});

client.login(DISCORD_TOKEN);