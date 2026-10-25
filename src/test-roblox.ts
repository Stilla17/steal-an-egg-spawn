import { getPublicServers } from "./service/roblox.service.js";

async function main() {
    try {
        await getPublicServers();
    } catch (error) {
        console.error("Xatolik:", error);
    }
}

main()