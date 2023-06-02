import winston from 'winston'
import config from '../config.js'

const customLevels = {
    names:{
        err:0,
        warning:1,
        information:2
    },
    colors:{
        err:'red',
        warning:'blue',
        information:'green'
    }
}

let logger
if(config.node_env === 'deveLogger'){
    logger = winston.createLogger({
        levels:customLevels.names,
        transports:[
            new winston.transports.Console({
                level:'information',
                format: winston.format.combine(
                    winston.format.colorize({colors:customLevels.colors}),
                    winston.format.simple(),
                )
            })
        ]
    })
} else {
    logger = winston.createLogger({
        transports:[
            new winston.transports.File({
                filename: './logsStage.log',
                level: 'http',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                )
            })
        ]
    })
}

export default logger