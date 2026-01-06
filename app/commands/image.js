
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import pixiv from "pixiv-api-client";

const query = "ケモ耳 和服 女の子";

export default {
    data: new SlashCommandBuilder()
        .setName("image")
        .setDescription("そんなに… 妾が見たいのか…？")
        .addStringOption(option =>
            option.setName("nsfw")
                .setDescription('NSFWの画像を表示します')
                .setRequired(true),
        ),

    async execute(inter) {
        const nsfw = inter.options.getBoolean("nsfw") || false;
        await inter.deferReply();
        const errMsg = "…やはり、恥ずかしいのじゃ！！！";

        try {
            await pixiv.login(
                process.env.PIXIV_USERNAME, 
                process.env.PIXIV_PASSWORD
            )

            const res = await pixiv.searchIllust(`${query} ${nsfw ? "R-18" : ""}`);
            if (res.illusts.length === 0) {
                await inter.editReply(errMsg);
                return;
            }

            // イラストデータを取得する
            const index = Math.floor(Math.random() * res.illusts.length);
            const illust = res.illusts[index];

            // 埋め込みメッセージを作成
            const embed = new EmbedBuilder()
                .setTitle(illust.title)
                .setURL(`https://www.pixiv.net/artworks/${illust.id}`)
                .setImage(illust.image_urls.large || illust.image_urls.medium)
                .setFooter({ text: `by ${illust.user.name}` });

            await inter.editReply({ embeds: [embed] });

        } catch (err) {
            console.error(err);
            // エラーメッセージを返信
            await inter.editReply(errMsg);
        }
    }
};
