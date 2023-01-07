const _ = {
    levels: ["fatal", "error", "warn", "info", "debug"]
};

const setInfo = function(info) {
    _.levels = info.levels;
}

const Logger = function(info) {
    
    this._ = JSON.parse(JSON.stringify(_));

    this._.levels.forEach(level => {
        this[level] = function(lineText) {
            const line = `[${Date.now}][${level}] ${lineText}`;

            console.log(line);
        }
    });

    
};

exports.setInfo = setInfo;
exports.Logger = Logger;