# dd-logger

### SampleCode

```javascript
//es module
//import { Logger } from "dd-logger";

const { Logger } = require("dd-logger");

const logger = new Logger();

const channel = logger.createChannel("main");
channel.debug("debug");//[nowTime][main] [DEBUG]debug
channel.warn("warn");//[nowTime][main] [WARN]warn

const channel2 = logger.createChannel("sub");
channel2.info("info");//[nowTime][sub] [INFO]info
channel2.error("error");//[nowTime][sub] [ERROR]error

const childChannel = channel.createChannel("child");
childChannel.info("info");//[nowTime][main][child] [INFO]info

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
(d: Date) => `${padZero(d.getHours(), 2)}:${padZero(d.getMinutes(), 2)}:${padZero(d.getSeconds(), 2)}`
```

writeLog: Function => any
```javascript
//default
(line: string) => { console.log(line) }

//example
(line: string) => { fs.appendFileSync("log.txt", line + "\n") }
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

[level]
-> Function(lineText) => [return]Option.writeLog

**Channel class**
logger
-> Logger

childs
-> Array\<Channel>

createChild(location: string)
-> Channel

[level]
-> Function(lineText) => [return]Option.writeLog