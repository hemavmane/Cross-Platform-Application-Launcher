require("dotenv").config();
const app = require("./app");
const connectMongo = require("./config/mongo");

const PORT = process.env.PORT || 2354;

async function startServer() {
  try {
    await connectMongo();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Launcher server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
}

startServer();
