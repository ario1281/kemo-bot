import { REST, Routes, SlashCommandBuilder } from "discord.js";

const cmds = [
    new SlashCommandBuilder()
        .setName("hello")
        .setDescription("ケモノたちに挨拶するのじゃ！"),
    new SlashCommandBuilder()
        .setName("dice")
        .setDescription("サイコロを振るのじゃ！")
        .addIntegerOption(option =>
            option.setName("face")
                .setDescription("サイコロの面の数　デフォルト:6")
                .setRequired(false)
        ),
].map(cmd => cmd.toJSON());

// RESTクライアントを作成
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function main() {
    try {
        console.log("🔄 コマンド登録中…");

        // グローバルコマンドとして登録
        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID
            ),
            { body: cmds },
        );

        console.log("✅ Globalコマンド登録完了（反映まで数分〜最大1時間）");

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: [] }
        );

    } catch (err) {
        console.error(err);
    }
}

main();

// end of app/deploy-commands.js