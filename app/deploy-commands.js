import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

dotenv.config();

// コマンドを格納する配列を作成
const cmds = [];

// commandsフォルダ内のコマンド定義ファイルを読み込み
const cmdsPath  = path.join(process.cwd(), "app/commands");
const cmdsFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith(".js"));

for (const file of cmdsFiles) {
    const { default: cmd } = await import(`./commands/${file}`);
    cmds.push(cmd.data.toJSON());
}

// コマンド登録処理をエクスポート
export default async function () {
    // RESTクライアントを作成
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

    // グローバルコマンドとして登録
    console.log("🔄 コマンド登録中…");

    await rest.put(
        Routes.applicationCommands(
            process.env.CLIENT_ID
        ),
        { body: cmds },
    );

    console.log("✅ Globalコマンド登録完了（反映まで数分〜最大1時間）");
}

// end of app/deploy-commands.js