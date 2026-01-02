import { Cilent, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const prefix = "!";

const cilent = new Cilent({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

cilent.once("ready", () => {
    console.log("Bot is online!");
});

client.on("messageCreate", (message) => {
    // Botのメッセージには反応しない
    if (message.author.bot) { return; }

    // 1文字目にprefixが含まれているか確認  
    if (message.content.startsWith(prefix)) {
        if (message.content === "ping") {
            message.channel.send("pong");
        }

        if (message.content === "!hello") {
            message.channel.send("Hello there!");
        }
    }
});