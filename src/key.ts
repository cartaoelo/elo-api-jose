// @ts-ignore
import jose from "node-jose";
import fs from 'fs'
import path from 'path'
import args from "./args";

type Key = { public: any, pair: any }

export async function generateKeyPair(): Promise<Key> {
    const jwk = await jose.JWK.createKey("EC", "P-256", { kid: args.kid })
    const key: Key = {
        pair: jwk.toJSON(true),
        public: jwk.toJSON(false)
    }
    saveKey(key)
    return key
}

function saveKey(key: Key) {
    fs.writeFile(args.keyPairPath, JSON.stringify(key, null, '\t'), (e) => {})
}

export async function loadKeyPair(): Promise<Key | undefined> {
    try {
        return require(args.keyPairPath)
    } catch (e) {
        // Do nothing
    }
}