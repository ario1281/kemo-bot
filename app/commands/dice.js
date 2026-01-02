import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("サイコロを振ります")
        .addIntegerOption(o =>
            o.setName("faces")
                .setDescription("面の数")
                .setRequired(false)
        ),
    
    async execute(inter) {
        const faces = inter.options.getInteger("faces") || 6;
        const value = Math.floor(Math.random() * faces) + 1;

        await inter.reply(`== ${faces}面サイコロ ==\n${value}の目が出たのじゃ！`);
    }
};