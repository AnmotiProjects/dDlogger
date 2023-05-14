const { Logger } = require("./dist/index");
const logger = new Logger({
    levels: ["error", "warn", "info"]
});

const channel = logger.createChannel("test");
channel.info(`It is "Info"`);
channel.warn(`It is "Warn"`);
channel.error(`It is "Error"`);

const childChannel = channel.createChild("child");
childChannel.info(`It is "Info"`);
childChannel.warn(`It is "Warn"`);
childChannel.error(`It is "Error"`);