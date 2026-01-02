const Discord = require('discord.js');
const client = new Discord.Client();

function sendMsg(chID,text, option={}) {
    client.channels.get(chID).send(text, option)
    .then(console.log("メッセージ送信" + text + JSON.stringify(option)))
    .catch(console.error);
}