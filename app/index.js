import { Client, Collection, GatewayIntentBits } from "discord.js";
import config from "../config.js";
import fs from "node:fs";
import path from "node:path";

import { hello_lines } from "./models/hello_line.js";

// コマンドを格納するコレクションを作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

client.commands = new Collection();

// commandsフォルダ内のコマンド定義ファイルを読み込み
const cmdsPath = path.join(process.cwd(), "app/commands");
const cmdFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith(".js"));

for (const file of cmdFiles) {
    const { default: cmd } = await import(`./commands/${file}`);
    client.commands.set(cmd.data.name, cmd);
}

// Botの準備完了時の処理
client.once("ready", () => {
    console.log(`${client.user.tag} 準備完了じゃ！`);
});

client.on("interactionCreate", async inter => {
    // チャット入力コマンドでなければ無視
    if (!inter.isChatInputCommand()) { return; }

    const cmd = client.commands.get(inter.commandName);
    if (!cmd) { return; }

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