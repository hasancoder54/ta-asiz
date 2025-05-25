const fetch = require("node-fetch");

// Kullanıcı adından ID alma
async function getUserId(username) {
    const url = "https://users.roblox.com/v1/usernames/users";
    const data = { usernames: [username], excludeBannedUsers: false };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        return json.data?.[0]?.id || null;
    } catch (error) {
        console.error("Hata:", error);
        return null;
    }
}

// ID'den grup bilgilerini alma
async function getUserGroups(userId) {
    const url = `https://groups.roblox.com/v2/users/${userId}/groups/roles`;

    try {
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        return await res.json();
    } catch (error) {
        console.error("Hata:", error);
        return null;
    }
}

module.exports = { getUserId, getUserGroups };