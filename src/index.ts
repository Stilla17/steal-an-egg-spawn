
import "dotenv/config";
import { Telegraf } from "telegraf";
import { startDiscordListener } from "./service/discord.service.js";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error("BOT_TOKEN yoki CHAT_ID topilmadi!");
}

// Telegram bot
const bot = new Telegraf(BOT_TOKEN);

// /start komandasi
bot.start(async (ctx) => {
    await ctx.reply("🥚 Steal an Egg Bot ishga tushdi!");
});

// /test komandasi
bot.command("test", async (ctx) => {
    await ctx.reply("✅ Telegram bot ishlayapti!");
});

// Discord listenerni ishga tushirish
startDiscordListener(async (spawnText: string) => {
    console.log("🥚 Yangi spawn:", spawnText);

    await bot.telegram.sendMessage(
        CHAT_ID,
        `🚨 DIVINE / ETERNAL SPAWN!\n\n${spawnText}`.slice(0, 4096)
    );

    console.log("✅ Telegramga xabar yuborildi!");
});

// Telegram botni ishga tushirish
bot.catch((err) => {
    console.error("Telegram xatosi:", err);
});

void bot.launch();

console.log("🚀 Telegram va Discord bot ishga tushmoqda...");
