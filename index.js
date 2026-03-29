const bedrock = require("bedrock-protocol");
const express = require("express");

const app = express();

// Simple web server for UptimeRobot
app.get("/", (req, res) => res.send("Bot is alive"));
app.listen(process.env.PORT || 3000, "0.0.0.0", () => console.log("Web server running"));

function startBot() {
  const bot = bedrock.createClient({
    host: "Asnhuaswal.aternos.me",
    port: 56898,
    username: "Advik_bot",
    offline: true,
    version: "1.26.0"
  });

  bot.on("join", () => {
    console.log("Bot joined server!");

    // Anti-AFK (safe)
    setInterval(() => {
      try {
        bot.queue("player_action", { action: "jump" });
      } catch {}
    }, 6000);
  });

  bot.on("disconnect", () => {
    console.log("Disconnected! Reconnecting in 5 sec...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => console.log("Error:", err.message));
}

startBot();
