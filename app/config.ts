import dotenv from "dotenv";

dotenv.config();

interface Config {
    prefix: string;
    DISCORD_TOKEN: string;
    CLIENT_ID: string;
    GUILD_ID?: string;
    PIXIV_ACCESS_TOKEN?: string;
    PIXIV_REFRESH_TOKEN?: string;
}

export const CONFIG: Config = {
    prefix: "!",
    DISCORD_TOKEN: process.env.DISCORD_TOKEN ?? "",
    CLIENT_ID: process.env.CLIENT_ID ?? "",
    GUILD_ID: process.env.GUILD_ID,
    PIXIV_ACCESS_TOKEN: process.env.PIXIV_ACCESS_TOKEN,
    PIXIV_REFRESH_TOKEN: process.env.PIXIV_REFRESH_TOKEN,
};