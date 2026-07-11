const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();

module.exports = redisClient;