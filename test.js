const dlogger = require("./lib/index.js");

dlogger.setDefault({
    levels: ["error", "warn", "info"],
    timezone: 9, //JST = +9
    //timeFormat: "YYYY/MM/DD hh:mm:sssss"
});

const logger = new dlogger.Channel();

logger.info(`It is "Info"`);
logger.warn(`It is "Warn"`);
logger.error(`It is "Error"`);