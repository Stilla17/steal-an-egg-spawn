import {
    Client,
    GatewayIntentBits,
} from "discord.js";

export const startDiscordListener = (onSpawn: (text: string) => Promise<void>) => {
    const token = process.env.DISCORD_TOKEN;
    const channelId = process.env.DISCORD_CANNEL_ID;

    if (!token || !channelId) {
        throw new Error("Discord token yoki Channel ID yo'q");
    }

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    client.once("clientReady", () => {
        console.log("✅ Discord bot ulandi!");
    });

    client.on("messageCreate", async (message) => {
        if (message.channelId !== channelId) return;

        const content = [
            message.content,
            ...message.embeds.flatMap((embed) => [
                embed.title ?? "",
                embed.description ?? "",
                ...embed.fields.map(
                    (field) => `${field.name}: ${field.value}`
                ),
            ]),
        ].join("\n");

        console.log("📩 Discord xabar:", content);

        // if (!/\b(divine|eternal)\b/i.test(content)) return;
        // if (!/\b(spawn|spawned|appeared)\b/i.test(content)) return;

        console.log("🥚 Divine/Eternal xabar topildi!");

        try {
            await onSpawn(content);
        } catch (error) {
            console.error("Telegramga yuborishda xato:", error);
        }
    })

    void client.login(token).catch(console.error);

    return client 
}