# dd-logger
```javascript
dlogger.setDefault({

    levels: ["error", "warn", "info"],
    
    timezone:  9 //JST = +9
    
    //timeFormat: "YYYY/MM/DD hh:mm:sssss"
    
    });
    
 
    const  logger = new  dlogger.Channel({ levels: ["error", "warn", "info"]});

    logger.error("Oh no, it is error.");
    logger.warn("It is info.");
    logger.debug("Debugging."); //Error
	```

Default is
```json
    {
    
    levels: ["fatal", "error", "warn", "info", "debug"],
    
    timezone:  "0",
    
    timeFormat:  "YYYY/MM/DD hh:mm:sssss"
    
    }
```