
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import pixiv from "pixiv-api-client";

const URI = "https://www.pixiv.net/artworks/";
const MAX_DATA = 1000;

export default {
    data: new SlashCommandBuilder()
        .setName("illust")
        .setDescription("そんなに… 妾が見たいのか…？"),

    async execute(inter) {
        const nsfw = inter.channel.nsfw;
        const failed = "…やはり、恥ずかしいのじゃ！！！";

        try {
            await inter.deferReply();

            await pixiv.login(
                process.env.PIXIV_USERNAME, 
                process.env.PIXIV_PASSWORD
            )

            const query = "女の子 ケモ耳 和服";
            const res = await pixiv.searchIllust(`${query} ${nsfw ? "" : "-R-18"}`);
            if (res.illusts.length === 0) {
                await inter.editReply(failed);
                return;
            }

            // イラストデータを取得する
            const sortedIllusts = res.illusts
                .sort((a, b) => b.total_bookmarks - a.total_bookmarks);
            const max = res.illusts.length < MAX_DATA ? res.illusts.length : MAX_DATA;
            const index = Math.floor(Math.random() * max);
            const illust = sortedIllusts[index];

            // 埋め込みメッセージを作成
            const embed = new EmbedBuilder()
                .setTitle(illust.title)
                .setURL(`${URI}${illust.id}`)
                .setImage(illust.image_urls.large || illust.image_urls.medium)
                .setFooter({ text: `by ${illust.user.name}` });

            await inter.editReply({ embeds: [embed] });

        } catch (err) {
            console.error(err);
            // エラーメッセージを返信
            await inter.editReply(failed);
        }
    }
};
