import { Client, Collection, GatewayIntentBits } from "discord.js";
import config from "../config.js";

import { hello_lines } from "./models/hello_line.js";

// コマンドを格納するコレクションを作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once("ready", () => {
    console.log(`${client.user.tag} 準備完了じゃ！`);
});

client.on("messageCreate", async (msg) => {
    // Botまたは自分のメッセージは無視
    if(msg.author.id == client.user.id || msg.author.bot) { return; }

    // コマンド処理
    if(msg.content.startsWith(config.prefix)) {
        const content = msg.content.substring(1, msg.content.length);
        const args = content.split(" ");
        const cmd = args.shift().toLowerCase();

        if (cmd === "hello")
        {
            const line = hello_lines[Math.floor(Math.random() * hello_lines.length)];
            await msg.channel.send(`${line} 🦊`);
        }
        if (cmd === "dice")
        {
            const face = parseInt(args[0]) || 6;
            const value = Math.floor(Math.random() * face) + 1;
            await msg.channel.send(`🎲 ${face}面サイコロで、"${value}"の目が出たのじゃ！`);
        }

    }
});

client.login(process.env.DISCORD_TOKEN);

// end of app/index.js