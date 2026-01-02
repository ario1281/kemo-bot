import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once("ready", () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    // Botのメッセージには反応しない
    if (message.author.bot) { return; }

    // 1文字目にprefixが含まれているか確認 
    const prefix = "!";
    if (message.content.startsWith(prefix)) {
        const content = message.content.substring(1, message.content.length);

        if (content === "ping") {
            message.channel.send("pong");
        }

        if (content === "hello") {
            message.channel.send("Hello there!");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);