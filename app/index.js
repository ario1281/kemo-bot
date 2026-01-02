import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import config from "../config.js";

dotenv.config();

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

client.on("messageCreate", (msg) => {
    // 自分とBotのメッセージには反応しない
    if (msg.author.id === client.user.id || msg.author.bot) {
        return;
    }

    // 1文字目にprefixが含まれているか確認
    if (msg.content.startsWith(config.prefix)) {
        const content = msg.content.substring(1, msg.content.length);

        // 
        if (content === "help") {
            msg.channel.send("説明じゃ！");
        }

        if (content === "hello") {
            msg.channel.send("お主、来おったのか");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);