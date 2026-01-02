import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import path from "node:path";

// コマンドを格納するコレクションを作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

client.commands = new Collection();

const cmdsPath = path.join(process.cwd(), "app/commands");
const cmdFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith(".js"));

for (const file of cmdFiles) {
    const { default: cmd } = await import(`./commands/${file}`);
    client.commands.set(cmd.data.name, cmd);
}

client.once("ready", () => {
    console.log(`${client.user.tag} 準備完了じゃ！`);
});

client.on("interactionCreate", async (inter) => {
    // ChatInputCommandか確認
    if (!inter.isChatInputCommand()) { return; }

    // コマンド取得
    const cmd = client.commands.get(inter.commandName);
    if (!cmd) { return; }

    // コマンド実行
    try {
        await cmd.execute(inter);
    } catch (err) {
        console.error(err);
        // エラーメッセージを返信
        await inter.reply({
            content: "コマンドの実行中に不具合が発生したのじゃ…",
            ephemeral: true,
        });
    }
});

client.login(process.env.DISCORD_TOKEN);

// end of app/index.js