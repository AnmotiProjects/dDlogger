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

const defaultOption: Option = {
    levels: ["fatal", "error", "warn", "info", "debug"],
    timeFormat: (d: Date) => `${padZero(d.getHours(), 2)}:${padZero(d.getMinutes(), 2)}:${padZero(d.getSeconds(), 2)}`,
    writeLog: (line: string) => { console.log(line) }
};

function padZero(num: number, length: number): string {
    return num.toString().padStart(length, "0");
}

class Logger {
    private option: Option = defaultOption;
    channels: Array<Channel> = [];

    constructor(option: OptionParam) {
        this.setOption(option);
        this.option.levels.forEach(level => {
            this[level] = function (lineText: string): any {
                const time: string = this.option.timeFormat(new Date());
                return this.option.writeLog(`[${time}] [${level.toUpperCase()}]${lineText}`);
            };
        });
    }

    setOption(option: OptionParam) {
        return this.option = {
            ...this.option,
            ...option
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
        this.location = location;
        this.option = option;

        this.option.levels.forEach(level => {
            this[level] = function (lineText: string): any {
                const time: string = this.option.timeFormat(new Date());
                return this.option.writeLog(`[${time}][${this.location.join("][")}] [${level.toUpperCase()}]${lineText}`);
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