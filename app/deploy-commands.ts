import { REST, Routes } from "discord.js";
import { CONFIG } from "@/config.ts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// コマンド用配列
const cmds: any[] = [];

// ===============================
// commands 読み込み
// ===============================
const cmdsPath  = path.join(process.cwd(), "app/commands");
const cmdsFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith(".ts"));

for (const file of cmdsFiles) {
    const { default: cmd } = await import(`./commands/${file}`);
    cmds.push(cmd.data.toJSON());
}

// ===============================
// デプロイ処理
// ===============================
const deploy = async () => {
    // RESTクライアントを作成
    const rest = new REST({ version: "10" }).setToken(CONFIG.DISCORD_TOKEN);

    // グローバルコマンドとして登録
    console.log("🔄 コマンド登録中…");

    await rest.put(
        Routes.applicationCommands(
            CONFIG.CLIENT_ID
        ),
        { body: cmds },
    );

    console.log("✅ Globalコマンド登録完了（反映まで数分〜最大1時間）");
}

// ===============================
// 直接実行時のみ実行
// ===============================
const current = fileURLToPath(import.meta.url);
const entry = path.join(process.cwd(), "app/deploy-commands.ts");

if (current === entry) {
    await deploy();
}

// end of app/deploy-commands.ts