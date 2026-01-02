import { SlashCommandBuilder } from "discord.js";
import { hello_lines } from "../models/hello_line.js";

export default {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("挨拶します"),

    async execute(interaction) {
        const line = hello_lines[Math.floor(Math.random() * hello_lines.length)];
        await interaction.reply(line);
    }
};
