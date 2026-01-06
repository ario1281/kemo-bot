
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("コマンド一覧、詳細を表示するのじゃ！"),

    async execute(inter) {
        // オプション確認用ログ
        console.log("name:", this.data.name);

        // Botに登録しているコマンド一覧を参照
        const cmds = inter.client.commands;
        const cmdName = inter.options.getString("command");

        if (cmdName) {
            const cmd = cmds.get(cmdName);

            if (!cmd) {
                return await inter.reply({
                    content: `そのようなコマンドは存在しないのじゃ… (${cmdName})`,
                    ephemeral: true,
                });
            }

            // ---- 詳細表示 ----
            const embed = new EmbedBuilder()
                .setTitle(`/${cmd.data.name}`)
                .setDescription(cmd.data.description ?? "説明なし")
                .setColor("Blue");

            return interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }

        // ---- 一覧表示 ----
        const list = commands
            .map(cmd => `- \`/${cmd.data.name}\` — ${cmd.data.description ?? ""}`)
            .join("\n");

        const embed = new EmbedBuilder()
            .setTitle("📖 コマンド一覧")
            .setDescription(list)
            .setColor("Green");

        await interaction.reply({
            embeds: [embed], 
            ephemeral: true,
        });
    }
};
