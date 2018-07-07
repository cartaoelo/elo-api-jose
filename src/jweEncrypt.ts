// @ts-ignore
import jose from 'node-jose'

export function jweEncrypt(input: any, key: any): Promise<string> {
    return jose.JWE.createEncrypt({ format: 'compact' }, key)
            .update(input)
            .final()
}