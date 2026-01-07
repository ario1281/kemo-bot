import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
    prefix: "$",
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID,
    PIXIV_ACCESS_TOKEN: process.env.PIXIV_ACCESS_TOKEN,
    PIXIV_REFRESH_TOKEN: process.env.PIXIV_REFRESH_TOKEN,
};