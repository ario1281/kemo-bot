import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("サイコロを振るのじゃ！")
        .addIntegerOption(option =>
            option.setName("face")
                .setDescription("サイコロの面の数　デフォルト:6")
                .setRequired(false)
        ),
    
    async execute(inter) {
        const face = inter.options.getInteger("face") || 6;
        const value = Math.floor(Math.random() * face) + 1;

        await inter.reply(`🎲 ${face}面サイコロで、"${value}"の目が出たのじゃ！`);
    }
};
