import { Client, GatewayIntentBits } from "discord.js";
import { hello_lines } from "./models/hello_line.js";
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
    if (msg.author.id === client.user.id || msg.author.bot) { return; }

    // 1文字目にprefixが含まれているか確認
    if (msg.content.startsWith(config.prefix)) {
        const content = msg.content.substring(1, msg.content.length);

        if (content === "hello") {
            const line = hello_lines[Math.floor(Math.random() * hello_lines.length)];
            msg.channel.send(line);
        }

        // 
        if (content === "dice") {
            const value = Math.floor(Math.random() * 6) + 1;
            msg.channel.send(`🎲 ${value} の目が出たのじゃ！`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);