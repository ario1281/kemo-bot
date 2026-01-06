
import { SlashCommandBuilder } from "discord.js";
import { LINES } from "../models/hello/lines.js";

export default {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("妾に挨拶するのじゃ！"),

    async execute(inter) {
        // オプション確認用ログ
        console.log("name:", this.data.name);

        // 
        const index = Math.floor(Math.random() * LINES.length);
        await inter.reply(LINES[index]);
    }
};
