import { log, LogLevel } from "./services/log.js";

const port = Number(process.env.PORT ?? 8080);

(async function() {
    const { initServer } = await import("./services/websocket.js");
    initServer(port);

  log(`The server is running on port ${port}`, LogLevel.INFO, true);
})();
