import swaggerJSDoc from 'swagger-jsdoc'
import { __dirname } from './utilsdos.js'


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentation API Ecommerce',
            version: '1.0.0',
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}

export const swaggerSetup = swaggerJSDoc(swaggerOptions)
