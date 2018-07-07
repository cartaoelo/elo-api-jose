// @ts-ignore
import jose from 'node-jose'

export function jwsSign(input: any, key: { kty: string }): Promise<string> {
    return jose.JWS.createSign({ format: 'compact', alg: 'ES256' }, key)
            .update(input)
            .final()
}