import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName("dice")
    .setDescription("さいころを振ります"),
  new SlashCommandBuilder()
    .setName("hello")
    .setDescription("挨拶します"),
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function main() {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );

  console.log("✅ Globalコマンド登録完了（反映まで数分〜最大1時間）");
}

main();