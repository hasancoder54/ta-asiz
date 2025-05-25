const express = require("express");
const { getUserId, getUserGroups } = require("./utils");

const app = express();

// API Endpoint
app.get("/api/roblox-groups", async (req, res) => {
    const username = req.query.username;
    if (!username) return res.status(400).json({ error: "Lütfen ?username=kullaniciadi şeklinde sorgula." });

    const userId = await getUserId(username);
    if (!userId) return res.status(404).json({ error: "Kullanıcı bulunamadı." });

    const data = await getUserGroups(userId);
    if (!data || !data.data) return res.status(404).json({ error: "Grup verisi bulunamadı." });

    res.json({
        user_id: userId,
        username: username,
        profile_link: `https://www.roblox.com/users/${userId}/profile`,
        groups: data.data.map(item => ({
            group_name: item.group?.name || "Bilinmiyor",
            role_name: item.role?.name || "Bilinmiyor",
            is_banned: item.isBanned || false
        }))
    });
});

module.exports = app;