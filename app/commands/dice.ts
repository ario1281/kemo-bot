import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("骰子(さいころ)を振るのじゃ！")
        .addIntegerOption(option =>
            option.setName("dice")
                .setDescription("ダイスロール　デフォルト:1d6")
                .setRequired(false)
        ),

    async execute(inter: ChatInputCommandInteraction) {
        // オプション確認用ログ
        console.log("name:", this.data.name);

        // ダイス
        const roll = inter.options.getString("dice") || "1d6";

        const regex = /^(?<item>\d+)d(?<face>\d+)$/i;
        const match = regex.exec(roll);

        if (!match || !match.groups) {
            await inter.reply(`❓ よく分からなかったのじゃ…`);
            return;
        }

        const item = parseInt(match.groups.item);
        const face = parseInt(match.groups.face);
        const rolls[];
        for (let i = 0; i < item; i++) {
            const val = Math.floor(Math.random() * face) + 1;
            sum += val;
            rolls.push(val);
        }

        await inter.reply([
            `🎲 ${face}面サイコロ${item}個を振ったのじゃ！！`,
            `[${rolls.join(", ")}] = ${rolls.reduce((a, c) => a + c, 0)}`
        ].join("\n"));
    }
};
