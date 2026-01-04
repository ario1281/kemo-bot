
import { SlashCommandBuilder } from "discord.js";
import { hello_lines } from "./models/hello_line.js";

export default {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("妾に挨拶するのじゃ！"),

    async execute(inter) {
        const index = Math.floor(Math.random() * hello_lines.length);
        await inter.reply(hello_lines[index]);
    }
};
