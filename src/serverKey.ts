import fetch from 'isomorphic-fetch'
import fs from 'fs-extra'
import path from 'path'
import { clientConfig } from './config'

const serverKeyPath = path.join(__dirname, '..', 'store', 'serverKey.json')

export async function getServerKey() {
    try {
        const storedKey = require(serverKeyPath)
        if (!storedKey.error) {
            return storedKey
        }
    } catch (e) {
        // Do nothing
    }
    const response = await fetch(clientConfig.serverUrl, {
        method: "GET",
        headers: clientConfig.headers,
    })
    try {
        const json = await response.json()
        fs.ensureDirSync(path.dirname(serverKeyPath))
        fs.writeFileSync(serverKeyPath, JSON.stringify(json, null, '\t'))
        return json
    } catch (e) {
        console.error(await response.text())
    }
}