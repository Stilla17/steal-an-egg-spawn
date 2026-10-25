const PLACE_ID = "107778070777162";

type RobloxServer = {
    id: string;
    playing: number;
    maxPlayers: number;
    fps?: number;
    ping?: number;
};

type ServerResponse = {
    data: RobloxServer[];
    nextPageCursor: string | null;
};

export async function getPublicServers() {
    const url = new URL(
        `https://games.roblox.com/v1/games/${PLACE_ID}/servers/Public`
    );

    url.searchParams.set("limit", "100");
    url.searchParams.set("sortOrder", "Asc");

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Roblox API error: ${response.status}`);
    }

    const result = (await response.json()) as ServerResponse;

    console.log("Public servers:", result.data.length);

    for (const server of result.data) {
        console.log({
            serverId: server.id,
            players: `${server.playing}/${server.maxPlayers}`,
            fps: server.fps,
            ping: server.ping,
        });
    }

    return result;
}