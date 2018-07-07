import path from 'path'
import args from './args';

const configPath = args.configPath

export const cardData = require(path.join(configPath, 'cardData.json'))
export const clientConfig: {
    serverUrl: string
    headers: {
        [header: string]: string
    }
} = require(path.join(configPath, 'client.json'))