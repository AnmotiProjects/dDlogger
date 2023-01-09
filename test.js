const DDlogger = require("./lib/index.js");

DDlogger.setDefault({
    levels: ["error", "warn", "info"],
    timezone: 9, //JST = +9
    //timeFormat: "YYYY/MM/DD hh:mm:sssss"
});

const logger = new DDlogger.Channel();

logger.info(`It is "Info"`);
logger.warn(`It is "Warn"`);
logger.error(`It is "Error"`);