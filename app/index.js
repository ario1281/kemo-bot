import { Client, Collection, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

dotenv.config();

// コマンドを格納するコレクションを作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

client.commands = new Collection();

// commandsフォルダ内のコマンド定義ファイルを読み込み
const cmdsPath = path.join(process.cwd(), "app/commands");
const cmdsFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith(".js"));

for (const file of cmdsFiles) {
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

    // コマンド名からコマンド定義を取得
    const cmd = client.commands.get(inter.commandName);
    if (!cmd) { return; }

    try {
        await cmd.execute(inter);
    } catch (err) {
        console.error(err);

        // エラーメッセージを返信
        if (inter.replied || inter.deferred) {
            await inter.followUp({
                content: "コマンドの実行中に不具合が発生したのじゃ…",
                ephemeral: true,
            });
        } else {
            await inter.reply({
                content: "コマンドの実行中に不具合が発生したのじゃ…",
                ephemeral: true,
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

// end of app/index.js