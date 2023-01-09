let defaultConfig = {
    levels: ["fatal", "error", "warn", "info", "debug"],
    timezone: "0",
    timeFormat: "YYYY/MM/DD hh:mm:sssss"
};

const setDefault = function (_config) {
    defaultConfig = {
        ...defaultConfig,
        ..._config
    }
}

function zero(num, length) {
    return num.toString().padStart(length, "0");
}

const Channel = function (_config = {}) {
    const config = {
        ...defaultConfig,
        ..._config
    }

    const timeFormats = {
        year: (config.timeFormat.match(new RegExp(/Y/g)) || []).length,
        second: (config.timeFormat.match(new RegExp(/s/g)) || []).length
    }

    config.levels.forEach(level => {
        this[level] = function (lineText) {
            const nowtime = new Date(Date.now() + config.timezone * 1000);

            let time = config.timeFormat
                //Year
                .replace("Y".repeat(timeFormats.year), nowtime.getFullYear().toString().slice(-timeFormats.year))
                //Month
                .replace("MM", zero(nowtime.getMonth() + 1, 2))
                //Day
                .replace("DD", zero(nowtime.getDate(), 2))
                //hour
                .replace("hh", zero(nowtime.getHours(), 2))
                //minitue
                .replace("mm", zero(nowtime.getMinutes(), 2))
                //second
                .replace("s".repeat(timeFormats.second), zero(nowtime.getSeconds(), 2) +  (timeFormats.second > 2 ? "." + zero(nowtime.getMilliseconds(), 3) : ""));
            const line = `[${time}][${level.toUpperCase()}] ${lineText}`;
            console.log(line);
        }
    });
};

exports.setDefault = setDefault;
exports.Channel = Channel;