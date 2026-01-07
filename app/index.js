import { Client, Collection, GatewayIntentBits } from "discord.js";
import { CONFIG } from "./config.js";
import fs from "node:fs";
import path from "node:path";

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

console.log("登録されているコマンド一覧:");
console.log(client.commands.map(cmd => cmd.data.name));

// Botの準備完了時の処理
client.once("ready", () => {
    console.log(`${client.user.tag} 準備完了じゃ！`);

    console.log("client.commands の中身：");
    console.log(client.commands);

    console.log("登録されているコマンド名：");
    console.log(client.commands.map(c => c.data?.name ?? "(名前なし)"));
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
        await inter.reply({
            content: "コマンドの実行中に不具合が発生したのじゃ…",
            ephemeral: true,
        });
    }
});

client.login(CONFIG.DISCORD_TOKEN);

// end of app/index.js