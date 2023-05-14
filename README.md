# dd-logger

### SampleCode

```javascript
//es module
import { Logger } from "dd-logger";
//
const { Logger } = require("dd-logger");

const logger = new Logger();

const channel = logger.createChannel("main");
channel.debug("debug");
channel.warn("warn");
//[nowTime][main] [DEBUG] debug
//[nowTime][main] [WARN] warn

const channel2 = logger.createChannel("sub");
channel2.info("info");
channel2.error("error");
//[nowTime][sub] [INFO] info
//[nowTime][sub] [ERROR] error

const childChannel = channel.createChannel("child");
childChannel.info("info");
//[nowTime][main][child] [INFO] info
//[nowTime][main][child] [ERROR] error

```
### API

**Option (OptionParam) interface**

levels: Array\<string>
```javascript
//default
["fatal", "error", "warn", "info", "debug"]
```

timeFormat: Function => string
```javascript
//default
function padZero(num: number, length: number) {
    return num.toString().padStart(length, "0");
}
(d: Date) => `${padZero(d.getHours(), 2)}:${padZero(d.getMinutes(), 2)}:${padZero(d.getSeconds(), 2)}`
```

writeLog: Function => any
```javascript
//default
(data: messageData) => {
    const { lineText, level, time, location } = data;
    console.log(`[${time}][${location.join("][")}] [${level}] ${lineText}`);
    return true;
}

//example
(data: messageData) => {
    const { lineText, level, time, location } = data;
    console.log(`[${time}][${location.join("][")}] [${level}] ${lineText}`);
    return fs.appendFile(`./log/${location.join("/")}/${level}.txt`, `[${time}] ${lineText}\n`);
}
```
**Logger class**
constructor(option?: OptionParam)
-> Logger

setOption(option: OptionParam)
-> Option

createChannel(location: string)
-> Channel

channels
-> Array\<Channel>

**Channel class**
logger
-> Logger

childs
-> Array\<Channel>

createChild(location: string)
-> Channel

[level]
-> Function(lineText) => [return]Option.writeLog