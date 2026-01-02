import { REST, Routes, SlashCommandBuilder } from "discord.js";
import fs from "node:fs";
import path from "node:path";

const cmds = [];

const cmdsPath = path.join(process.cwd(), "app/commands");
const cmdFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith(".js"));

// コマンドデータを収集
for (const file of cmdFiles) {
    const { default: cmd } = await import(`./commands/${file}`);
    cmds.push(cmd.data.toJSON());
}

// RESTクライアントを作成
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// グローバルコマンドとして登録
await rest.put(
    Routes.applicationCommands(
      process.env.CLIENT_ID
    ),
    { body: cmds },
);

console.log("✅ Globalコマンド登録完了（反映まで数分〜最大1時間）");

// ギルドコマンドとして登録
await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID, 
      process.env.GUILD_ID
    ),
    { body: cmds },
);

console.log("✅ Guildコマンド登録完了");

// end of app/deploy-commands.js