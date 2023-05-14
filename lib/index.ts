interface Option {
    levels: Array<string>;
    timeFormat: Function;
    writeLog: Function;
}

interface OptionParam {
    levels?: Array<string>;
    timeFormat?: Function;
    writeLog?: Function;
}

interface messageData {
    lineText: string;
    level: string;
    time: string;
    location: Array<string>;
}

function padZero(num: number, length: number): string {
    return num.toString().padStart(length, "0");
}

const defaultOption: Option = {
    levels: ["fatal", "error", "warn", "info", "debug"],
    timeFormat: (d: Date) => `${padZero(d.getHours(), 2)}:${padZero(d.getMinutes(), 2)}:${padZero(d.getSeconds(), 2)}`,
    writeLog: (data: messageData): any => {
        const { lineText, level, time, location } = data;
        console.log(`[${time}][${location.join("][")}] [${level}] ${lineText}`);
        return true;
    }
};

class Logger {
    private option: Option = defaultOption;
    channels: Array<Channel> = [];

    constructor(option: OptionParam) {
        this.setOption(option);
    }

    setOption(option: OptionParam) {
        return this.option = {
            levels: (option.levels ?? this.option.levels).map(level => level.toUpperCase()),
            timeFormat: option.timeFormat ?? this.option.timeFormat,
            writeLog: option.writeLog ?? this.option.writeLog
        };
    }

    createChannel(locationStr: string): Channel {
        const location: Array<string> = [locationStr];
        return new Channel(this, location, this.option)
    }
    [key: string]: any;
}

class Channel {
    logger: Logger;
    private location: Array<string>;
    private option: Option;
    childs: Array<Channel> = [];

    constructor(logger: Logger, location: Array<string>, option: Option) {
        this.logger = logger;
        this.location = location.map(str => str.toLowerCase());
        this.option = option;
        this.option.levels.forEach(level => {
            this[level.toLowerCase()] = function (lineText: string): any {
                const data = {
                    lineText,
                    level,
                    time: this.option.timeFormat(new Date()),
                    location: this.location
                }
                return this.option.writeLog(data);
            };
        });
    }

    createChild(locationStr: string): Channel {
        const location: Array<string> = [...this.location, locationStr];
        const channel: Channel = new Channel(this.logger, location, this.option);
        this.childs.push(channel);
        return channel;
    }
    [key: string]: any;
}

export { Logger }